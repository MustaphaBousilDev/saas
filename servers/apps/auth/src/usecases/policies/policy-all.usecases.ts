import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Policies,
  PolicyRepositorySQL,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PolicyFilterDTO } from './dtos';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class PolicyAllUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly policyRepository: PolicyRepositorySQL,
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
        'Rate limited exceded Create Policy (Failed)',
      );
      throw new BadRequestException('rate limited exceeded Register (Failed)');
    }
  }

  async getAllPolicy(filterDto: PolicyFilterDTO): Promise<Policies[]> {
    try {
      const { policyName, status, page, pageSize } = filterDto;
      const where: FindOptionsWhere<Policies> = {};
      if (policyName) where.policyName = policyName;
      if (status !== undefined) where.status = status;
      const skip =
        page && pageSize ? (parseInt(page) - 1) * pageSize : undefined;
      const take = pageSize;
      const policies = await this.policyRepository.find(
        where,
        { user: true },
        skip,
        take,
      );
      this.logger.log(
        'Get Policy are Succesfly',
        `Getting All Policy from the Database is done`,
      );
      return policies;
    } catch (err) {
      this.logger.error(
        'Error fetching policy',
        'Error when fetching Policy from the database',
      );
    }
    throw new BadRequestException('Failed to fetch resources');
  }
}
