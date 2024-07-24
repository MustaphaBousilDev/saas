import { LoggerService } from '@app/infra/logger/logger.service';
import { Role, RoleRepositorySQL } from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
//import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class RoleGetUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly roleRepository: RoleRepositorySQL,
    private readonly rateLimiter: RateLimiterService,
  ) {}

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
    //const where: FindOptionsWhere<Role> = { name: roleName };
    //where.name = roleName;
    try {
      const role = await this.roleRepository.findOne(
        { name: roleName },
        { user: true },
      );
      if (!role) {
        this.logger.warn(
          'Role not found',
          `Role with name ${roleName} does not exist`,
        );
        throw new NotFoundException('Role not found');
      }
      this.logger.log(
        'Success Get Role',
        `Successfully found role with name: ${roleName}`,
      );
      return role;
    } catch (err) {
      this.logger.error('Error Find role', `${err}`);
      throw new InternalServerErrorException(`${err.message}`);
    }
  }
}
