import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Permission,
  PermissionRepositorySQL,
  Resource,
  ResourceRepositorySQL,
  ResourceRolePermessionRepositorySQL,
  Role,
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

  async checkUserExist(userId: number) {
    try {
      const user = await this.userRepository.findOne({ _id: userId });
      if (user) {
        this.logger.warn(
          'User not found',
          `User with this ID ${userId} not found while fetching in RoleCreateUseCases`,
        );
        throw new BadRequestException('This User Exist');
      }
      return true;
    } catch (error) {
      this.logger.error(
        'Error fetching user',
        `Error occurred while fetching user with ID ${userId}: ${error.message}`,
      );
      throw new NotFoundException('User not found');
    }
  }

  async checkPermissionByName(name: string) {
    const permission = await this.permissionRepository.find({ name });
    if (permission.length > 0) {
      this.logger.warn(
        'Duplicate ropermission  name',
        `permission with name '${name}' already exists while trying to create a new permission`,
      );
      throw new NotFoundException(`
        permission with name '${name}' already exists`);
    }
  }

  async createPermission(
    permissionDTO: any,
    userId: number,
  ): Promise<Permission> {
    const user = await this.getUser(userId);
    const permission = new Permission({
      ...permissionDTO,
      user: user,
    });
    try {
      const newPermission = await this.permissionRepository.create(permission);
      this.logger.log(
        'Permission created succesfully',
        `Permission '${permissionDTO.name}' created successfully with ID: ${newPermission._id} in Date: ${newPermission.createdAt}`,
      );
      return newPermission;
    } catch (error) {
      this.logger.error(
        'Error creating permission',
        `Error occurred while creating permission: ${error.message}`,
      );
      throw new BadRequestException('Failed to create permission');
    }
  }

  async getRole(roleId: number): Promise<Role | any> {
    try {
      const role = await this.roleRepository.findOne({ _id: roleId });
      if (!role) {
        this.logger.warn(
          'Role not Found',
          `Role with this ID: ${roleId} does not exist`,
        );
        throw new NotFoundException('Role Not found');
      }
      return role;
    } catch (error) {
      this.logger.error(
        'Error fetching role',
        `Error occurred while fetching role with ID ${roleId}: ${error.message}`,
      );
      throw new NotFoundException('Role not found');
    }
  }
  async getResource(resourceId: number): Promise<Resource | any> {
    try {
      const resource = await this.resourceRepository.findOne({
        _id: resourceId,
      });
      if (!resource) {
        this.logger.warn(
          'Resourec not Found',
          `Resource with this ID: ${resourceId} does not exist`,
        );
      }
      return resource;
    } catch (error) {
      this.logger.error(
        'Error fetching resource',
        `Error occurred while fetching resource with ID ${resourceId}: ${error.message}`,
      );
      throw new NotFoundException('Resource not found');
    }
  }
  async getPermission(permissionId: number): Promise<Resource | any> {
    try {
      const permission = await this.permissionRepository.findOne({
        _id: permissionId,
      });
      if (!permission) {
        this.logger.warn(
          'Resourec not Found',
          `Resource with this ID: ${permissionId} does not exist`,
        );
      }
      return permission;
    } catch (error) {
      this.logger.error(
        'Error fetching permission',
        `Error occurred while fetching permission with ID ${permissionId}: ${error.message}`,
      );
      throw new NotFoundException('Permission not found');
    }
  }
  /*async createIAM(createIAM: IAMCreateInputDTO, userId: number) {
    const { userId: UserID, roles: rolesDTO, ...IAMDTO } = createIAM;
    console.log(UserID, rolesDTO);
    try {
      //check user is exist in users table
      const user = await this.getUser(createIAM.userId);
      //console.log('user', user);
      //check user is exist in IAM
      const userIAM = await this.iamRepository.findOne({
        user: user,
      });
      //console.log('userIAM', userIAM);
      if (userIAM) {
        throw new Error(
          'User is Already Exist in IAM , You cant create other permission',
        );
      }
      //const userCreated = await this.getUser(userId);
      const rolesList = createIAM.roles.map((role) => role.name);
      const resourceList = createIAM.roles.flatMap((role) =>
        role.resources.map((resource) => resource.name),
      );
      const permissionList = Array.from(
        new Set(
          createIAM.roles.flatMap((role) =>
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
      if (!rolesR.length) {
        throw new Error('Failed to get RolesList');
      }
      if (!resourcesR.length) {
        throw new Error('Failed to get ResourceList');
      }
      if (!permissionsR.length) {
        throw new Error('Failed to get PermissionList');
      }
      if (!user) {
        throw new Error('Failed to get User Assigned');
      }
      //map
      createIAM.roles.map(async (role) => {
        const rol = await this.roleRepository.findOne({
          name: role.name,
        });
        role.resources.map(async (resource) => {
          const reso = await this.resourceRepository.findOne({
            name: resource.name,
          });
          resource.permissions.map(async (permission) => {
            const per = await this.permissionRepository.findOne({
              name: permission,
            });
            const saved = new Role_Has_Resource_Permission({
              ...IAMDTO,
              user: userCreated,
              userCreated: user,
              resource: reso,
              permission: per,
              role: rol,
            });
            await this.iamRepository.create(saved);
          });
        });
      });
    } catch (error) {
      this.logger.error(
        'Error creating IAM',
        `Error occurred while creating IAM: ${error.message}`,
      );
      throw new BadRequestException('Failed to create IAM');
    }
  }*/

  async createIAM(createIAM: IAMCreateInputDTO, userId: number) {
    const { userId: UserID, roles: rolesDTO, ...IAMDTO } = createIAM;
    console.log(UserID, rolesDTO);
    try {
      // Check if user exists in users table
      const user = await this.getUser(createIAM.userId);
      if (!user) {
        throw new Error('User does not exist');
      }
      // Check if user exists in IAM
      const userIAM = await this.iamRepository.findOne({ user });
      if (userIAM) {
        throw new Error(
          'User already exists in IAM, cannot create other permission',
        );
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
              userCreated: user,
              resource,
              permission,
              role,
            });
            iamEntities.push(iamEntity);
          });
        });
      });
      await this.iamRepository.createMany(iamEntities);
    } catch (error) {
      this.logger.error(
        'Error creating IAM',
        `Error occurred while creating IAM: ${error.message}`,
      );
      throw new BadRequestException('Failed to create IAM');
    }
  }
}
