import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TagsSTOCK, UserSTOCK } from '../../models';

@Injectable()
export class TagRepositorymySQL extends AbstractRepositorymySQL<TagsSTOCK> {
  protected readonly logger = new Logger(TagRepositorymySQL.name);

  constructor(
    @InjectRepository(TagsSTOCK)
    TagRepository: Repository<TagsSTOCK>,
    entityManager: EntityManager,
  ) {
    super(TagRepository, entityManager);
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
