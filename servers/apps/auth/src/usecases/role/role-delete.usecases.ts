import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Role,
  RoleRepositorySQL,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class RoleDeleteUseCases {
  constructor(
    private readonly logger: LoggerService,
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
        'Rate limited exceded Create Role (Failed)',
      );
      throw new BadRequestException('rate limited exceeded Register (Failed)');
    }
  }

  async checkRole(name: string): Promise<Role | any> {
    try {
      const role = await this.roleRepository.find({ name });
      if (role.length > 0) {
        this.logger.log(
          'Success Find Role',
          `Success Find Role with this name: ${name} in the database`,
        );
        return role;
      }
      this.logger.warn(
        'Not Found Role 404',
        `This role name: ${name} not exist in the database`,
      );
      return null;
    } catch (error) {
      this.logger.error(
        `Error found Role`,
        `Error occurred while Find Role with this name: ${name} , Message Error: ${error}`,
      );
      throw new NotFoundException(`Role Not found`);
    }
  }

  async deleteRole(name: string): Promise<string> {
    try {
      const result = await this.roleRepository.findOneAndDelete({
        name: name,
      });
      if (result.affected === 0) {
        throw new NotFoundException('Role not found');
      }
      this.logger.log(
        'Success Deleting Role',
        `Successfully deleted role with name: ${name}`,
      );
      return name;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error('Error Deleting role', `Role not found: ${name}`);
        throw new BadRequestException(`
          Something went wrong, error: ${error.message}`);
      } else {
        this.logger.error(
          'Error Deleting role',
          `Unexpected error while deleting role: ${error.message}`,
        );
        throw new BadRequestException(`
          Something went wrong, error: ${error.message}`);
      }
    }
  }
}
