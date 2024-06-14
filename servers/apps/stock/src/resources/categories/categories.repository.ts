import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CategorySTOCK, UserSTOCK } from '../../models';

@Injectable()
export class CategoryRepositorymySQL extends AbstractRepositorymySQL<CategorySTOCK> {
  protected readonly logger = new Logger(CategoryRepositorymySQL.name);

  constructor(
    @InjectRepository(CategorySTOCK)
    CategoryRepository: Repository<CategorySTOCK>,
    entityManager: EntityManager,
  ) {
    super(CategoryRepository, entityManager);
  }
}

@Injectable()
export class UserRepositorySQL extends AbstractRepositorymySQL<UserSTOCK> {
  protected readonly logger = new Logger(UserRepositorySQL.name);

  constructor(
    @InjectRepository(UserSTOCK)
    UserRepositorymySQL: Repository<UserSTOCK>,
    entityManager: EntityManager,
  ) {
    super(UserRepositorymySQL, entityManager);
  }
}
