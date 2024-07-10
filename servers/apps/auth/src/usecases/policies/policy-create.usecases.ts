import { LoggerService } from '@app/infra/logger/logger.service';
import {
  PolicyRepositorySQL,
  Policies,
  UserAuth,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PolicyCreateInputDTO } from './dtos';

@Injectable()
export class PolicyCreateUseCases {
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

  async getUser(userId: number): Promise<UserAuth | any> {
    try {
      const user = await this.userRepository.findOne({ _id: userId });
      if (!user) {
        this.logger.warn(
          'User not found',
          `User with this ID ${userId} not found while fetching in PolicyCreateUseCases`,
        );
      }
      return user;
    } catch (error) {
      this.logger.error(
        'Error fetching user',
        `Error occurred while fetching user with ID ${userId}: ${error.message}`,
      );
      throw new NotFoundException('User not found');
    }
  }

  async checkPolicyByName(policyName: string) {
    const policy = await this.policyRepository.find({
      policyName,
    });
    if (policy.length > 0) {
      this.logger.warn(
        'Duplicate policy name',
        `Policy with name '${policyName}' already exists while trying to create a new policy`,
      );
      throw new NotFoundException(`
        Policy with name '${policyName}' already exists`);
    }
  }

  async createPolicy(
    policyDTO: PolicyCreateInputDTO,
    userId: number,
  ): Promise<Policies> {
    const user = await this.getUser(userId);
    const policy = new Policies({
      ...policyDTO,
      user: user,
    });
    try {
      const newPolicy = await this.policyRepository.create(policy);
      this.logger.log(
        'Policy created succesfully',
        `Policy '${policyDTO.policyName}' created successfully with ID: ${newPolicy._id} in Date: ${newPolicy.createdAt}`,
      );
      return newPolicy;
    } catch (error) {
      this.logger.error(
        'Error creating policy',
        `Error occurred while creating resource: ${error.message}`,
      );
      throw new BadRequestException('Failed to create policy');
    }
  }
}
