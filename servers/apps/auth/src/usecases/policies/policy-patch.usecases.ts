import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Policies,
  PolicyRepositorySQL,
  UserAuth,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PolicyUpdateInputDTO } from './dtos';

@Injectable()
export class PolicyPatchUseCases {
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
        'Rate Limited Failed',
        `Rate limited exceded create Role (Failed)`,
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
          `User with this ID ${userId} not found while fetching in RoleCreateUseCases`,
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

  async verifyPolicyByName(policyName: string): Promise<Policies | any> {
    try {
      const policy = await this.policyRepository.findOne({ policyName });
      if (policy) {
        this.logger.log(
          'Policy Success',
          `Policy with this name: ${policyName} was found it in the database`,
        );
      }
      return policy;
    } catch (error) {
      this.logger.error(
        'Error fetching policy',
        `Error occurred while fetching policy with Name: ${policyName}: ${error.message}`,
      );
      throw new NotFoundException('Policy not found');
    }
  }

  async checkPolicyByName(policyName: string) {
    const policy = await this.policyRepository.find({ policyName });
    if (policy.length > 0) {
      this.logger.warn(
        'Duplicate policy name',
        `Policy with name '${policyName}' already exists while trying to create a new resource`,
      );
      throw new NotFoundException(`
        Policy with name '${policyName}' already exists`);
    }
  }

  async updatePolicy(
    policyName: string,
    userId: number,
    policyDTO: PolicyUpdateInputDTO,
  ) {
    try {
      const getResource = await this.verifyPolicyByName(policyName);
      if (getResource) {
        this.logger.log(
          'Success Find Policy',
          'Success geting policy from the database',
        );
        const user = await this.getUser(userId);
        policyDTO['user'] = user;
        //update role
        return this.policyRepository.findOneAndUpdate(
          { policyName },
          {
            ...policyDTO,
            updatedAt: new Date(),
          },
        );
      }
    } catch (error) {
      this.logger.error(
        'Error updating  policy',
        `Error occured while updating policy: ${error.message}`,
      );
      throw new BadRequestException('Failed process updating policy');
    }
  }

  async softDelete(policyName: string) {
    try {
      const getResource = await this.verifyPolicyByName(policyName);
      if (getResource) {
        this.logger.log(
          'Success Find Policy',
          `Success Getting policy : ${name} from the database`,
        );
        return this.policyRepository.findOneAndUpdate(
          { policyName },
          {
            deletedAt: new Date(),
          },
        );
      }
    } catch (error) {
      this.logger.error(
        'Error updating policy to softDelete',
        `Error occured while updating policy softdelete: ${error.message}`,
      );
      throw new BadRequestException('Failed process updating policy');
    }
  }
}
