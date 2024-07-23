import { LoggerService } from '@app/infra/logger/logger.service';
import {
  PermissionRepositorySQL,
  ResourceRepositorySQL,
  ResourceRolePermessionRepositorySQL,
  Role_Has_Resource_Permission,
  RoleRepositorySQL,
  UserAuth,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAMCreateInputDTO } from './dtos';
import { In } from 'typeorm';

@Injectable()
export class IAMCreateUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly permissionRepository: PermissionRepositorySQL,
    private readonly resourceRepository: ResourceRepositorySQL,
    private readonly iamRepository: ResourceRolePermessionRepositorySQL,
    private readonly roleRepository: RoleRepositorySQL,
    private readonly userRepository: UserRepositorySQL,
    private readonly rateLimiter: RateLimiterService,
  ) {}

  async rateLimiting(ip: string) {
    const allowed = await this.rateLimiter.consume(ip);
    if (allowed) {
      return 'This route is rate limeted';
    } else {
      this.logger.error(
        'Rate limited Failed',
        'Rate limited exceded Create Permission (Failed)',
      );
      throw new BadRequestException('rate limited exceeded Register (Failed)');
    }
  }

  async getUser(userId: number): Promise<UserAuth | any> {
    try {
      const user = await this.userRepository.findOne({ _id: userId });
      if (user) {
        this.logger.warn(
          'User Exist in the database',
          `User with this ID ${userId} has own resource  , you need update it resource, not created new resouce`,
        );
      } else {
        this.logger.warn(
          'User Not Found',
          `User with this ID ${userId} has own resource  , you need update it resource, not created new resouce`,
        );
        throw new NotFoundException('User not Found');
      }
      return user;
    } catch (error) {
      this.logger.error(
        'Error fetching user',
        `Error occurred while fetching user with ID ${userId}: ${error.message}`,
      );
      throw new BadRequestException('Something wrong');
    }
  }

  async createIAM(createIAM: IAMCreateInputDTO, userId: number) {
    const { userId: UserID, roles: rolesDTO, ...IAMDTO } = createIAM;
    console.log(UserID, rolesDTO);
    try {
      // Check if user exists in users table
      const user = await this.getUser(createIAM.userId);
      if (!user) {
        throw new Error('User does not exist');
      }
      const rolesList = rolesDTO.map((role) => role.name);
      const resourceList = rolesDTO.flatMap((role) =>
        role.resources.map((resource) => resource.name),
      );
      const permissionList = Array.from(
        new Set(
          rolesDTO.flatMap((role) =>
            role.resources.flatMap((resource) => resource.permissions),
          ),
        ),
      );
      const [rolesR, resourcesR, permissionsR, userCreated] = await Promise.all(
        [
          this.roleRepository.findMany({ where: { name: In(rolesList) } }),
          this.resourceRepository.findMany({
            where: { name: In(resourceList) },
          }),
          this.permissionRepository.findMany({
            where: { name: In(permissionList) },
          }),
          this.userRepository.findOne({ _id: userId }),
        ],
      );
      if (
        !rolesR.length ||
        !resourcesR.length ||
        !permissionsR.length ||
        !userCreated
      ) {
        throw new Error('Failed to get required entities');
      }
      const roleMap = new Map(rolesR.map((role) => [role.name, role]));
      const resourceMap = new Map(
        resourcesR.map((resource) => [resource.name, resource]),
      );
      const permissionMap = new Map(
        permissionsR.map((permission) => [permission.name, permission]),
      );
      const iamEntities: Role_Has_Resource_Permission[] = [];
      rolesDTO.forEach((roleDTO) => {
        const role = roleMap.get(roleDTO.name);
        roleDTO.resources.forEach((resourceDTO) => {
          const resource = resourceMap.get(resourceDTO.name);
          resourceDTO.permissions.forEach((permissionName) => {
            const permission = permissionMap.get(permissionName);
            const iamEntity = new Role_Has_Resource_Permission({
              ...IAMDTO,
              user: userCreated,
              usercreated: user,
              resource,
              permission,
              role,
            });
            iamEntities.push(iamEntity);
          });
        });
      });
      console.log('here in final');
      const result = await this.iamRepository.createMany(iamEntities);
      return result;
    } catch (error) {
      this.logger.error(
        'Error creating IAM',
        `Error occurred while creating IAM: ${error.message}`,
      );
      throw new BadRequestException('Failed to create IAM');
    }
  }

  async checkUserIfExistinIAMResource(
    userId: number,
    idTenant: string,
  ): Promise<UserAuth | UserAuth[] | void> {
    try {
      console.log('tototo', userId);
      const user = await this.iamRepository.findOneNative(userId, idTenant);
      console.log('user', user);
      const userIAM = await this.iamRepository.findManyByUserIdsQueryBuilder(
        [userId],
        null,
        ['_id'],
      );
      console.log('userIAM', userIAM);
      if (userIAM && userIAM.length > 0) {
        this.logger.warn(
          'User Exist in the database',
          `Ùser with id ${userId} found in the database`,
        );
        throw new BadRequestException('User exist!');
      }
      return user;
    } catch (err) {
      throw new BadRequestException('User Already Has own resource');
    }
  }
}
