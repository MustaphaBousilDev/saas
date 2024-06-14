import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CategorySTOCK, SubCategorySTOCK, UserSTOCK } from '../../models';
@Injectable()
export class SubCategoryRepositorymySQL extends AbstractRepositorymySQL<SubCategorySTOCK> {
  protected readonly logger = new Logger(SubCategoryRepositorymySQL.name);

  constructor(
    @InjectRepository(SubCategorySTOCK)
    SubCategoryRepository: Repository<SubCategorySTOCK>,
    entityManager: EntityManager,
  ) {
    super(SubCategoryRepository, entityManager);
  }
}

@Injectable()
export class UserRepositorymySQL extends AbstractRepositorymySQL<UserSTOCK> {
  protected readonly logger = new Logger(UserRepositorymySQL.name);

  constructor(
    @InjectRepository(UserSTOCK)
    UserRepository: Repository<UserSTOCK>,
    entityManager: EntityManager,
  ) {
    super(UserRepository, entityManager);
  }
}

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
