import { LoggerService } from '@app/infra/logger/logger.service';
import {
  ResourceRolePermessionRepositorySQL,
  Role_Has_Resource_Permission,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import { BadRequestException, Injectable } from '@nestjs/common';
//import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class IAMGetUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly iamRepository: ResourceRolePermessionRepositorySQL,
    private readonly rateLimiter: RateLimiterService,
  ) {}

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

  async getIAMUser(
    idTenant: string,
    user_id: number,
  ): Promise<Role_Has_Resource_Permission[] | any> {
    //const where: FindOptionsWhere<Permission> = { name: roleName };
    //where.name = roleName;
    try {
      const result = await this.iamRepository.findIAMUserGroupByUser(
        idTenant,
        user_id,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
