import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { HotelSTOCK, UserSTOCK } from '../../models';

@Injectable()
export class HotelRepositorymySQL extends AbstractRepositorymySQL<HotelSTOCK> {
  protected readonly logger = new Logger(HotelRepositorymySQL.name);

  constructor(
    @InjectRepository(HotelSTOCK)
    HotelRepository: Repository<HotelSTOCK>,
    entityManager: EntityManager,
  ) {
    super(HotelRepository, entityManager);
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
