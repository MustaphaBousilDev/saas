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

@Injectable()
export class RoleCreateUseCases {
  constructor(
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
    console.log('hahahahahha');
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

  async checkRoleByName(name: string) {
    const role = await this.roleRepository.find({ name });
    console.log('this is role');
    console.log(role.length);
    if (role.length > 0) {
      this.logger.warn(
        'Duplicate role name',
        `Role with name '${name}' already exists while trying to create a new role`,
      );
      throw new NotFoundException(`Role with name '${name}' already exists`);
    }
  }

  async createRole(roleDTO: RoleCreateInputDTO, userId: number): Promise<Role> {
    console.log('before user');
    console.log('user Id', userId);
    const user = await this.getUser(userId);
    console.log('after user');
    const role = new Role({
      ...roleDTO,
      user: user,
    });
    try {
      const newRole = await this.roleRepository.create(role);
      this.logger.log(
        'Role created succesfully',
        `Role '${roleDTO.name}' created successfully with ID: ${newRole._id} in Date: ${newRole.createdAt}`,
      );
      return newRole;
    } catch (error) {
      this.logger.error(
        'Error creating role',
        `Error occurred while creating role: ${error.message}`,
      );
      throw new BadRequestException('Failed to create role');
    }
  }
}
