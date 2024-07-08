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
import { ResourceUpdateInputDTO } from './dtos';

@Injectable()
export class ResourcePatchUseCases {
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

  async verifyResourceByName(name: string): Promise<Resource | any> {
    try {
      const resource = await this.resourceRepository.findOne({ name });
      if (resource) {
        this.logger.log(
          'Resource Success',
          `Resource with this name: ${name} was found it in the database`,
        );
      }
      return resource;
    } catch (error) {
      this.logger.error(
        'Error fetching resource',
        `Error occurred while fetching resource with Name: ${name}: ${error.message}`,
      );
      throw new NotFoundException('Resource not found');
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

  async updateResource(
    name: string,
    userId: number,
    resourceDTO: ResourceUpdateInputDTO,
  ) {
    try {
      const getResource = await this.verifyResourceByName(name);
      if (getResource) {
        this.logger.log(
          'Success Find Resource',
          'Success geting resource from the database',
        );
        const user = await this.getUser(userId);
        resourceDTO['user'] = user;
        //update role
        return this.resourceRepository.findOneAndUpdate(
          { name },
          {
            ...resourceDTO,
            updatedAt: new Date(),
          },
        );
      }
    } catch (error) {
      this.logger.error(
        'Error updating  resource',
        `Error occured while updating resource: ${error.message}`,
      );
      throw new BadRequestException('Failed process updating resource');
    }
  }

  async softDelete(name: string) {
    try {
      const getResource = await this.verifyResourceByName(name);
      if (getResource) {
        this.logger.log(
          'Success Find Resource',
          `Success Getting resourec : ${name} from the database`,
        );
        return this.resourceRepository.findOneAndUpdate(
          { name },
          {
            deletedAt: new Date(),
          },
        );
      }
    } catch (error) {
      this.logger.error(
        'Error updating resource to softDelete',
        `Error occured while updating resource softdelete: ${error.message}`,
      );
      throw new BadRequestException('Failed process updating resource');
    }
  }
}
