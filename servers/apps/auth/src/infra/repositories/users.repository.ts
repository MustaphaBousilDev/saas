import {
  // AbstractRepository,
  AbstractRepositorymySQL,
  // UserDocument,
} from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserAuth } from '../entities/user.entity';
import { UserDOMAIN } from '@app/domain';

@Injectable()
export class UserRepositorySQL extends AbstractRepositorymySQL<UserAuth> {
  protected readonly logger = new Logger(UserRepositorySQL.name);

  constructor(
    @InjectRepository(UserAuth)
    userRepository: Repository<UserAuth>,
    entityManager: EntityManager,
  ) {
    super(userRepository, entityManager);
  }

  /*async getUserByEmail(email: string): Promise<UserDOMAIN> {
    const userEntity = await this.entityRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!userEntity) {
      return null;
    }
    return this.toUser(userEntity);
  }
  async getUserByUsername(username: string): Promise<UserDOMAIN> {
    const userEntity = await this.entityRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!userEntity) {
      return null;
    }
    return this.toUser(userEntity);
  }*/
  async updateLastLogin() {}
  async verifyStatusEmail() {}

  private toUser(adminUserEntity: UserAuth): UserDOMAIN {
    const user: UserDOMAIN = new UserDOMAIN();
    user.email = adminUserEntity.email;
    user.username = adminUserEntity.username;
    user.password = adminUserEntity.password;
    user.status = adminUserEntity.status;
    return user;
  }
}
