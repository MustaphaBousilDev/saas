import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Resource,
  ResourceRepositorySQL,
  UserAuth,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResourceCreateInputDTO } from './dtos';

@Injectable()
export class ResourceCreateUseCases {
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

  async checkResourceByName(name: string) {
    const resource = await this.resourceRepository.find({ name });
    if (resource.length > 0) {
      this.logger.warn(
        'Duplicate resource name',
        `Resource with name '${name}' already exists while trying to create a new resource`,
      );
      throw new NotFoundException(`
        Resource with name '${name}' already exists`);
    }
  }

  async createResouce(
    resourceDTO: ResourceCreateInputDTO,
    userId: number,
  ): Promise<Resource> {
    const user = await this.getUser(userId);
    const resource = new Resource({
      ...resourceDTO,
      user: user,
    });
    try {
      const newResource = await this.resourceRepository.create(resource);
      this.logger.log(
        'Resource created succesfully',
        `Resource '${resourceDTO.name}' created successfully with ID: ${newResource._id} in Date: ${newResource.createdAt}`,
      );
      return newResource;
    } catch (error) {
      this.logger.error(
        'Error creating resource',
        `Error occurred while creating resource: ${error.message}`,
      );
      throw new BadRequestException('Failed to create resource');
    }
  }
}
