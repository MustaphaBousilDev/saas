import { LoggerService } from '@app/infra/logger/logger.service';
import { Policies, PolicyRepositorySQL } from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
//import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class PolicyGetUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly policyRepository: PolicyRepositorySQL,
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

  async getPolicy(policyName: string): Promise<Policies> {
    try {
      const policy = await this.policyRepository.findOne(
        { policyName: policyName },
        { user: true },
      );
      if (!policy) {
        this.logger.warn(
          'Policy not found',
          `Policy with name ${policyName} does not exist`,
        );
        throw new NotFoundException('Resource not found');
      }
      this.logger.log(
        'Success Get Policy',
        `Successfully found resource with name: ${policyName}`,
      );
      return policy;
    } catch (err) {
      this.logger.error('Error Find policy', `${err}`);
      throw new InternalServerErrorException(`${err.message}`);
    }
  }
}
