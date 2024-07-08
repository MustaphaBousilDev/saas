import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Resource,
  ResourceRepositorySQL,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ResourceFilterDTO } from './dtos';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class ResourceAllUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly resourceRepository: ResourceRepositorySQL,
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
        'Rate limited exceded Create Resource (Failed)',
      );
      throw new BadRequestException('rate limited exceeded Register (Failed)');
    }
  }

  async getAllResource(filterDto: ResourceFilterDTO): Promise<Resource[]> {
    try {
      const { name, status, page, pageSize } = filterDto;
      const where: FindOptionsWhere<Resource> = {};
      if (name) where.name = name;
      if (status !== undefined) where.status = status;
      const skip =
        page && pageSize ? (parseInt(page) - 1) * pageSize : undefined;
      const take = pageSize;
      const resources = await this.resourceRepository.find(
        where,
        { user: true },
        skip,
        take,
      );
      this.logger.log(
        'Get Resource are Succesfly',
        `Getting All Resource from the Database is done`,
      );
      return resources;
    } catch (err) {
      this.logger.error(
        'Error fetching role',
        'Error when fetching Resource from the database',
      );
    }
    throw new BadRequestException('Failed to fetch resources');
  }
}
