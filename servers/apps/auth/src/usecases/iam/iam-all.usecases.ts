import { LoggerService } from '@app/infra/logger/logger.service';
import { ResourceRolePermessionRepositorySQL } from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IAMFilterDTO } from './dtos';

@Injectable()
export class IAMAllUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly iamRepository: ResourceRolePermessionRepositorySQL,
    private readonly rateLimiter: RateLimiterService,
  ) {}
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

  async getAllIAM(
    filterDto: IAMFilterDTO,
    req: any,
    idTenant: string,
  ): Promise<any> {
    try {
      const iamList =
        await this.iamRepository.findAndGroupByRoleAndResource(idTenant);
      return iamList;
    } catch (err) {
      this.logger.error(
        'Error fetching iam',
        'Error when fetching IAM from the database',
      );
    }
    throw new BadRequestException('Failed to fetch IAM');
  }
}
