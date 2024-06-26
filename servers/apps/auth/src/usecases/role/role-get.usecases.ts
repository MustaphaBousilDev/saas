import { LoggerService } from '@app/infra/logger/logger.service';
import { Role, RoleRepositorySQL } from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class RoleGetUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly roleRepository: RoleRepositorySQL,
    private readonly rateLimiter: RateLimiterService,
  ) {
    console.log('in construct login');
  }

  async rateLimiting(ip: string) {
    const allowed = await this.rateLimiter.consume(ip);
    if (allowed) {
      return 'This route is rate Limited';
    } else {
      this.logger.error(
        'Rate Limited Failed',
        `Rate limited exceded Create Role (Failed)`,
      );
      throw new BadRequestException('rate limited exceeded Register (Failed)');
    }
  }

  async getRole(roleName: string): Promise<Role> {
    const where: FindOptionsWhere<Role> = {};
    where.name = roleName;
    const role = await this.roleRepository.findOne(where, { user: true });
    try {
      if (role) {
        this.logger.log(
          'Succes Get Role',
          `Success Find Role with this name: ${roleName}`,
        );
        return role;
      }
      throw new NotFoundException('This Role not exist');
    } catch (err) {
      this.logger.error(
        'Error Find role',
        `Error occurred while finding Role that has name : ${roleName}`,
      );
      throw new BadRequestException('Someting wrong');
    }
  }
}
