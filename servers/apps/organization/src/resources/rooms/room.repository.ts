import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RoomORG } from '../../models/rooms.schema';
import { HotelORG } from '../../models/hotel.schema';
//import { UserORG } from '../../models/users.mysql.entity';

@Injectable()
export class RoomRepositorySQL extends AbstractRepositorymySQL<RoomORG> {
  protected readonly logger = new Logger(RoomRepositorySQL.name);

  constructor(
    @InjectRepository(RoomORG)
    RoomRepository: Repository<RoomORG>,
    entityManager: EntityManager,
  ) {
    super(RoomRepository, entityManager);
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
