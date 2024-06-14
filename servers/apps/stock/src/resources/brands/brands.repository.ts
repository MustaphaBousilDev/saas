import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BrandSTOCK, UserSTOCK } from '../../models';

@Injectable()
export class BrandRepositorymySQL extends AbstractRepositorymySQL<BrandSTOCK> {
  protected readonly logger = new Logger(BrandRepositorymySQL.name);

  constructor(
    @InjectRepository(BrandSTOCK)
    BrandsRepository: Repository<BrandSTOCK>,
    entityManager: EntityManager,
  ) {
    super(BrandsRepository, entityManager);
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
