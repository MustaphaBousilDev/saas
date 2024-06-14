import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { WifiORG } from '../../models/wifi.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { HotelORG } from '../../models/hotel.schema';
import { UserORG } from '../../models/users.mysql.entity';

@Injectable()
export class WifiRepositorySQL extends AbstractRepositorymySQL<WifiORG> {
  protected readonly logger = new Logger(WifiRepositorySQL.name);

  constructor(
    @InjectRepository(WifiORG)
    WifiRepository: Repository<WifiORG>,
    entityManager: EntityManager,
  ) {
    super(WifiRepository, entityManager);
  }
}

@Injectable()
export class HotelRepositorySQL extends AbstractRepositorymySQL<HotelORG> {
  protected readonly logger = new Logger(HotelRepositorySQL.name);

  constructor(
    @InjectRepository(HotelORG)
    HotelRepository: Repository<HotelORG>,
    entityManager: EntityManager,
  ) {
    super(HotelRepository, entityManager);
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
