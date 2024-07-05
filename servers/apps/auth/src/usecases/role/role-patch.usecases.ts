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
import { RoleUpdateInputDTO } from './dtos';

@Injectable()
export class RolePatchUseCases {
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

  async verifyRoleByName(name: string): Promise<Role | any> {
    try {
      const role = await this.roleRepository.findOne({ name });
      if (role) {
        this.logger.log(
          'Role Success',
          `Role with this name: ${name} was found it in the database`,
        );
      }
      return role;
    } catch (error) {
      this.logger.error(
        'Error fetching role',
        `Error occurred while fetching role with Name: ${name}: ${error.message}`,
      );
      throw new NotFoundException('Role not found');
    }
  }

  async checkRoleByName(name: string) {
    const role = await this.roleRepository.find({ name });
    if (role.length > 0) {
      this.logger.warn(
        'Duplicate role name',
        `Role with name '${name}' already exists while trying to create a new role`,
      );
      throw new NotFoundException(`Role with name '${name}' already exists`);
    }
  }

  async updateRole(name: string, userId: number, roleDTO: RoleUpdateInputDTO) {
    try {
      const getRole = await this.verifyRoleByName(name);
      if (getRole) {
        this.logger.log(
          'Success Find Role',
          'Success geting role from the database',
        );
        const user = await this.getUser(userId);
        roleDTO['user'] = user;
        //update role
        return this.roleRepository.findOneAndUpdate(
          { name },
          {
            ...roleDTO,
            updatedAt: new Date(),
          },
        );
      }
    } catch (error) {
      this.logger.error(
        'Error updating  role',
        `Error occured while updating role: ${error.message}`,
      );
      throw new BadRequestException('Failed process updating role');
    }
  }

  async softDelete(name: string) {
    try {
      const getRole = await this.verifyRoleByName(name);
      if (getRole) {
        this.logger.log(
          'Success Find Role',
          `Success Getting role : ${name} from the database`,
        );
        return this.roleRepository.findOneAndUpdate(
          { name },
          {
            deletedAt: new Date(),
          },
        );
      }
    } catch (error) {
      this.logger.error(
        'Error updating role to softDelete',
        `Error occured while updating role softdelete: ${error.message}`,
      );
      throw new BadRequestException('Failed process updating role');
    }
  }
}
