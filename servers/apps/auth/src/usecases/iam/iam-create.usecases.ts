import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Permission,
  PermissionRepositorySQL,
  Resource,
  ResourceRepositorySQL,
  ResourceRolePermessionRepositorySQL,
  Role,
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
import { flatMap } from 'rxjs';

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
  async createIAM(createIAM: IAMCreateInputDTO, userId: number) {
    try {
      const userCreated = await this.getUser(userId);
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
      const [roles, resources, permissions, user] = await Promise.all([
        this.roleRepository.findMany({ where: { name: In(rolesList) } }),
        this.resourceRepository.findMany({ where: { name: In(resourceList) } }),
        this.permissionRepository.findMany({
          where: { name: In(permissionList) },
        }),
        this.getUser(createIAM.userId),
      ]);
      console.log('user assigned', user);
      console.log('roles', roles);
      console.log('resource', resources);
      console.log('permissions', permissions);
      //const user = await this.getUser(createIAM.userId);
      if (!roles.length) {
        throw new Error('Failed to get RolesList');
      }
      if (!resources.length) {
        throw new Error('Failed to get ResourceList');
      }
      if (!permissions.length) {
        throw new Error('Failed to get PermissionList');
      }
      if (!user) {
        throw new Error('Failed to get User Assigned');
      }
    } catch (error) {
      this.logger.error(
        'Error creating IAM',
        `Error occurred while creating IAM: ${error.message}`,
      );
      throw new BadRequestException('Failed to create IAM');
    }
  }
}
