import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Policies,
  PolicyRepositorySQL,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class PolicyDeleteUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly policyRepository: PolicyRepositorySQL,
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

  async checkPolicy(policyName: string): Promise<Policies | any> {
    try {
      const policy = await this.policyRepository.find({ policyName });
      console.log('po', policy);
      if (policy.length > 0) {
        this.logger.log(
          'Success Find Policies',
          `Success Find Policies with this name: ${policyName} in the database`,
        );
        return policy;
      }
      this.logger.warn(
        'Not Found Policies 404',
        `This resource name: ${policyName} not exist in the database`,
      );
      return null;
    } catch (error) {
      this.logger.error(
        `Error found Policies`,
        `Error occurred while Find Policies with this name: ${policyName} , Message Error: ${error}`,
      );
      throw new NotFoundException(`Policies Not found`);
    }
  }

  async deletePolicies(policyName: string): Promise<string> {
    try {
      const result = await this.policyRepository.findOneAndDelete({
        policyName,
      });
      if (result.affected === 0) {
        throw new NotFoundException('Policies not found');
      }
      this.logger.log(
        'Success Deleting Policies',
        `Successfully deleted resource with name: ${policyName}`,
      );
      return policyName;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(
          'Error Deleting resource',
          `Policies not found: ${policyName}`,
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
