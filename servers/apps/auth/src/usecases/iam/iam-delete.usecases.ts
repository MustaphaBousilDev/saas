import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Permission,
  PermissionRepositorySQL,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class IAMDeleteUseCases {
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

  async checkPermission(name: string): Promise<Permission | any> {
    try {
      const permission = await this.permissionRepository.find({ name });
      if (permission.length > 0) {
        this.logger.log(
          'Success Find Permission',
          `Success Find Permission with this name: ${name} in the database`,
        );
        return permission;
      }
      this.logger.warn(
        'Not Found Permission 404',
        `This permission name: ${name} not exist in the database`,
      );
      return null;
    } catch (error) {
      this.logger.error(
        `Error found Permission`,
        `Error occurred while Find Permission with this name: ${name} , Message Error: ${error}`,
      );
      throw new NotFoundException(`Permission Not found`);
    }
  }

  async deletePermission(name: string): Promise<string> {
    try {
      const result = await this.permissionRepository.findOneAndDelete({ name });
      if (result.affected === 0) {
        throw new NotFoundException('Permission not found');
      }
      this.logger.log(
        'Success Deleting Permission',
        `Successfully deleted permission with name: ${name}`,
      );
      return name;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(
          'Error Deleting permission',
          `Permission not found: ${name}`,
        );
        throw new BadRequestException(`
          Something went wrong, error: ${error.message}`);
      } else {
        this.logger.error(
          'Error Deleting permission',
          `Unexpected error while deleting permission: ${error.message}`,
        );
        throw new BadRequestException(`
          Something went wrong, error: ${error.message}`);
      }
    }
  }
}
