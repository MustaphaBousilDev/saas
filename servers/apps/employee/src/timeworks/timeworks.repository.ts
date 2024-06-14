import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TimeWorkEMP } from '../models/time-work.schema';
import { UserEMP } from '../models/users.schema';

@Injectable()
export class TimeWorkRepositorymySQL extends AbstractRepositorymySQL<TimeWorkEMP> {
  protected readonly logger = new Logger(TimeWorkRepositorymySQL.name);

  constructor(
    @InjectRepository(TimeWorkEMP)
    TimeWorkRepository: Repository<TimeWorkEMP>,
    entityManager: EntityManager,
  ) {
    super(TimeWorkRepository, entityManager);
  }
}

@Injectable()
export class UserRepositorymySQL extends AbstractRepositorymySQL<UserEMP> {
  protected readonly logger = new Logger(UserRepositorymySQL.name);

  constructor(
    @InjectRepository(UserEMP)
    UserRepository: Repository<UserEMP>,
    entityManager: EntityManager,
  ) {
    super(UserRepository, entityManager);
  }
}
