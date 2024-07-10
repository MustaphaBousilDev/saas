import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Permission,
  PermissionRepositorySQL,
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

@Injectable()
export class IAMCreateUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly permissionRepository: PermissionRepositorySQL,
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
    console.log('hahahahahha');
    try {
      const user = await this.userRepository.findOne({ _id: userId });
      if (!user) {
        this.logger.warn(
          'User not found',
          `User with this ID ${userId} not found while fetching in RoleCreateUseCases`,
        );
      }
      return user;
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
    permissionDTO: IAMCreateInputDTO,
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
}
