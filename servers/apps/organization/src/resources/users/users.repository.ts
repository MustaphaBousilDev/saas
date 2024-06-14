import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { UserORG } from '../../models/users.mysql.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserRepositorySQLForRoom extends AbstractRepositorymySQL<UserORG> {
  protected readonly logger = new Logger(UserRepositorySQLForRoom.name);

  constructor(
    @InjectRepository(UserORG)
    usersRepositorySQL: Repository<UserORG>,
    entityManager: EntityManager,
  ) {
    super(usersRepositorySQL, entityManager);
  }
}
