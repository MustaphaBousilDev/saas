import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { DepartementORG } from '../../models/departement.schema';
import { UserORG } from '../../models/users.mysql.entity';

@Injectable()
export class DepartementRepositorySQL extends AbstractRepositorymySQL<DepartementORG> {
  protected readonly logger = new Logger(DepartementRepositorySQL.name);

  constructor(
    @InjectRepository(DepartementORG)
    DepartementRepository: Repository<DepartementORG>,
    entityManager: EntityManager,
  ) {
    super(DepartementRepository, entityManager);
  }
}

@Injectable()
export class UserRepositorySQL extends AbstractRepositorymySQL<UserORG> {
  protected readonly logger = new Logger(UserRepositorySQL.name);

  constructor(
    @InjectRepository(UserORG)
    UserRepository: Repository<UserORG>,
    entityManager: EntityManager,
  ) {
    super(UserRepository, entityManager);
  }
}
