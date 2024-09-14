import { LoggerService } from '@app/infra/logger/logger.service';
import {
  Role,
  RoleRepositorySQL,
  UserAuth,
  UserRepositorySQL,
} from '@app/infra/persistences';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleCreateInputDTO } from './dtos';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRoleCommand } from './CQRS/commands/implementations';

@Injectable()
export class RoleCreateUseCases {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly logger: LoggerService,
    private readonly roleRepository: RoleRepositorySQL,
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
    const response = await this.queryBus.execute();
    /*try {
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
    }*/
  }

  async checkRoleByName(name: string) {
    const role = await this.roleRepository.find({ name });
    if (role && role.length > 0) {
      this.logger.warn(
        'Duplicate role name',
        `Role with name '${name}' already exists while trying to create a new role`,
      );
      throw new NotFoundException(`Role with name '${name}' already exists`);
    }
  }

  async createRole(roleDTO: RoleCreateInputDTO, userId: number): Promise<Role> {
    try {
      const user = await this.getUser(userId);
      console.log('hello', user);
      const responseCommand = await this.commandBus.execute(
        new CreateRoleCommand(roleDTO, user),
      );
      return responseCommand;
    } catch (error) {
      console.log('this is the error', error.message);
      throw error;
    }
  }
}
