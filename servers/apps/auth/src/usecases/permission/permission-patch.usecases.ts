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
import { PermissionUpdateInputDTO } from './dtos';

@Injectable()
export class PermissionPatchUseCases {
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
        'Rate Limited Failed',
        `Rate limited exceded create permission (Failed)`,
      );
      throw new BadRequestException('rate limited exceeded Register (Failed)');
    }
  }

  async getUser(userId: number): Promise<UserAuth | any> {
    try {
      const user = await this.userRepository.findOne({ _id: userId });
      if (!user) {
        this.logger.warn(
          'User not found',
          `User with this ID ${userId} not found while fetching in PermissionCreateUseCases`,
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

  async verifyPermissionByName(name: string): Promise<Permission | any> {
    try {
      const permission = await this.permissionRepository.findOne({ name });
      if (permission) {
        this.logger.log(
          'Permission Success',
          `Permission with this name: ${name} was found it in the database`,
        );
      }
      return permission;
    } catch (error) {
      this.logger.error(
        'Error fetching permission',
        `Error occurred while fetching permission with Name: ${name}: ${error.message}`,
      );
      throw new NotFoundException('Permission not found');
    }
  }

  async checkPermissionByName(name: string) {
    const permission = await this.permissionRepository.find({ name });
    if (permission.length > 0) {
      this.logger.warn(
        'Duplicate permission name',
        `Permission with name '${name}' already exists while trying to create a new permission`,
      );
      throw new NotFoundException(`
        Permission with name '${name}' already exists`);
    }
  }

  async updatePermission(
    name: string,
    userId: number,
    roleDTO: PermissionUpdateInputDTO,
  ) {
    try {
      const getPermission = await this.verifyPermissionByName(name);
      if (getPermission) {
        this.logger.log(
          'Success Find Permission',
          'Success geting permission from the database',
        );
        const user = await this.getUser(userId);
        roleDTO['user'] = user;
        //update permission
        return this.permissionRepository.findOneAndUpdate(
          { name },
          {
            ...roleDTO,
            updatedAt: new Date(),
          },
        );
      }
    } catch (error) {
      this.logger.error(
        'Error updating  permission',
        `Error occured while updating permission: ${error.message}`,
      );
      throw new BadRequestException('Failed process updating permission');
    }
  }

  async softDelete(name: string) {
    try {
      const getPermission = await this.verifyPermissionByName(name);
      if (getPermission) {
        this.logger.log(
          'Success Find Permission',
          `Success Getting permission : ${name} from the database`,
        );
        return this.permissionRepository.findOneAndUpdate(
          { name },
          {
            deletedAt: new Date(),
          },
        );
      }
    } catch (error) {
      this.logger.error(
        'Error updating permission to softDelete',
        `Error occured while updating permission softdelete: ${error.message}`,
      );
      throw new BadRequestException('Failed process updating permission');
    }
  }
}
