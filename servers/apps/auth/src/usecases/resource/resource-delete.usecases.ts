import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Resource,
  ResourceRepositorySQL,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ResourceDeleteUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly resourceRepository: ResourceRepositorySQL,
    private readonly userRepository: UserRepositorySQL,
    private readonly rateLimiter: RateLimiterService,
  ) {}

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

  async checkResource(name: string): Promise<Resource | any> {
    try {
      const resource = await this.resourceRepository.find({ name });
      if (resource.length > 0) {
        this.logger.log(
          'Success Find Resource',
          `Success Find Resource with this name: ${name} in the database`,
        );
        return resource;
      }
      this.logger.warn(
        'Not Found Resource 404',
        `This resource name: ${name} not exist in the database`,
      );
      return null;
    } catch (error) {
      this.logger.error(
        `Error found Resource`,
        `Error occurred while Find Resource with this name: ${name} , Message Error: ${error}`,
      );
      throw new NotFoundException(`Resource Not found`);
    }
  }

  async deleteResource(name: string): Promise<string> {
    try {
      const result = await this.resourceRepository.findOneAndDelete({ name });
      if (result.affected === 0) {
        throw new NotFoundException('Resource not found');
      }
      this.logger.log(
        'Success Deleting Resource',
        `Successfully deleted resource with name: ${name}`,
      );
      return name;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(
          'Error Deleting resource',
          `Resource not found: ${name}`,
        );
        throw new BadRequestException(`
          Something went wrong, error: ${error.message}`);
      } else {
        this.logger.error(
          'Error Deleting resource',
          `Unexpected error while deleting resource: ${error.message}`,
        );
        throw new BadRequestException(`
          Something went wrong, error: ${error.message}`);
      }
    }
  }
}
