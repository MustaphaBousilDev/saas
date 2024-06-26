import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Role,
  RoleRepositorySQL,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleFilterDTO } from './dtos';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class RoleAllUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly roleRepository: RoleRepositorySQL,
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
        'Rate limited exceded Create Role (Failed)',
      );
      throw new BadRequestException('rate limited exceeded Register (Failed)');
    }
  }

  async getAllRoles(filterDto: RoleFilterDTO): Promise<Role[]> {
    try {
      const { name, status, page, pageSize } = filterDto;
      const where: FindOptionsWhere<Role> = {};
      if (name) where.name = name;
      if (status !== undefined) where.status = status;
      const skip =
        page && pageSize ? (parseInt(page) - 1) * pageSize : undefined;
      const take = pageSize;
      const roles = await this.roleRepository.find(
        where,
        { user: true },
        skip,
        take,
      );
      console.log('this is roles');
      console.log(roles);
      this.logger.log(
        'Get Roles are Succesfly',
        `Getting All Roles from the Database is done`,
      );
      return roles;
    } catch (err) {
      this.logger.error(
        'Error fetching role',
        'Error when fetching Roles from the database',
      );
    }
    throw new BadRequestException('Failed to fetch roles');
  }
}
