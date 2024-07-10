import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Permission,
  PermissionRepositorySQL,
  Role,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IAMFilterDTO } from './dtos';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class IAMAllUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly permissionRepository: PermissionRepositorySQL,
    private readonly userRepository: UserRepositorySQL,
    private readonly rateLimiter: RateLimiterService,
  ) {
    console.log('in construct login');
  }
  async rateLimiting(ip: string) {
    const allowed = await this.rateLimiter.consume(ip);
    if (allowed) {
      return 'This route is rate limeted';
    } else {
      this.logger.error(
        'Rate limited Failed',
        'Rate limited exceded Create Permissions (Failed)',
      );
      throw new BadRequestException('rate limited exceeded Register (Failed)');
    }
  }

  async getAllPermissions(filterDto: IAMFilterDTO): Promise<Permission[]> {
    try {
      const { name, status, page, pageSize } = filterDto;
      const where: FindOptionsWhere<Role> = {};
      if (name) where.name = name;
      if (status !== undefined) where.status = status;
      const skip =
        page && pageSize ? (parseInt(page) - 1) * pageSize : undefined;
      const take = pageSize;
      const permissions = await this.permissionRepository.find(
        where,
        { user: true },
        skip,
        take,
      );
      this.logger.log(
        'Get Permissions are Succesfly',
        `Getting All Permissions from the Database is done`,
      );
      return permissions;
    } catch (err) {
      this.logger.error(
        'Error fetching permissions',
        'Error when fetching Permissions from the database',
      );
    }
    throw new BadRequestException('Failed to fetch permissions');
  }
}
