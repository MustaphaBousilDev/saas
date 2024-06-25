import { AbstractRepositorymySQL } from '@app/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserAuth } from '../entities/user.entity';
import { UserDOMAIN } from '@app/domain';
import { CONNECTION } from '@app/shared/tenancy/tenancy.symbols';

@Injectable()
export class UserRepositorySQL extends AbstractRepositorymySQL<UserAuth> {
  protected readonly logger = new Logger(UserRepositorySQL.name);

  constructor(
    @InjectRepository(UserAuth)
    userRepository: Repository<UserAuth>,
    entityManager: EntityManager,
    @Inject(CONNECTION) private readonly dataSource: DataSource,
  ) {
    //super(userRepository, entityManager);
    super(dataSource.getRepository(UserAuth), dataSource.createEntityManager());
  }
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
