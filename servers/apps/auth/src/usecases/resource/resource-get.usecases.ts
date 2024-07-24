import { LoggerService } from '@app/infra/logger/logger.service';
import { Resource, ResourceRepositorySQL } from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
//import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class ResourceGetUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly resourceRepository: ResourceRepositorySQL,
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

  async getResource(resourceName: string): Promise<Resource> {
    try {
      const resource = await this.resourceRepository.findOne(
        { name: resourceName },
        { user: true },
      );
      if (!resource) {
        this.logger.warn(
          'Resource not found',
          `Resource with name ${resourceName} does not exist`,
        );
        throw new NotFoundException('Resource not found');
      }
      this.logger.log(
        'Success Get Resource',
        `Successfully found resource with name: ${resourceName}`,
      );
      return resource;
    } catch (err) {
      this.logger.error('Error Find resource', `${err}`);
      throw new InternalServerErrorException(`${err.message}`);
    }
  }
}
