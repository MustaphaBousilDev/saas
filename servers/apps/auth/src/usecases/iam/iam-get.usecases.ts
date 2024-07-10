import { LoggerService } from '@app/infra/logger/logger.service';
import { Permission, PermissionRepositorySQL } from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
//import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class IAMGetUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly permissionRepository: PermissionRepositorySQL,
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
        `Rate limited exceded Create Permission (Failed)`,
      );
      throw new BadRequestException('rate limited exceeded Register (Failed)');
    }
  }

  async getPermission(roleName: string): Promise<Permission> {
    //const where: FindOptionsWhere<Permission> = { name: roleName };
    //where.name = roleName;
    try {
      const permission = await this.permissionRepository.findOne(
        { name: roleName },
        { user: true },
      );
      if (!permission) {
        this.logger.warn(
          'Permission not found',
          `Permission with name ${roleName} does not exist`,
        );
        throw new NotFoundException('Permission not found');
      }
      this.logger.log(
        'Success Get Permission',
        `Successfully found permission with name: ${roleName}`,
      );
      return permission;
    } catch (err) {
      this.logger.error('Error Find permission', `${err}`);
      throw new InternalServerErrorException(`${err.message}`);
    }
  }
}
