import { LoggerService } from '@app/infra/logger/logger.service';
import {
  ResourceRolePermessionRepositorySQL,
  UserAuth,
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
    private readonly iamRepository: ResourceRolePermessionRepositorySQL,
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

  /*async checkPermission(name: string): Promise<Permission | any> {
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
  }*/

  async deleteIAM(userCreatedID: number): Promise<UserAuth> {
    try {
      const user = await this.userRepository.findOne({ _id: userCreatedID });
      const result = await this.iamRepository.findOneAndDelete({
        usercreated: user,
      });
      if (result.affected === 0) {
        throw new NotFoundException('IAM not found');
      }
      this.logger.log(
        'Success Deleting IAM',
        `Successfully deleted IAM From User with name: ${user.username}`,
      );
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(
          'Error Deleting IAM',
          `IAM not found: ${error.message}`,
        );
        throw new BadRequestException(`
          Something went wrong, error: ${error.message}`);
      } else {
        this.logger.error(
          'Error Deleting IAM',
          `Unexpected error while deleting IAM: ${error.message}`,
        );
        throw new BadRequestException(`
          Something went wrong, error: ${error.message}`);
      }
    }
  }
}
