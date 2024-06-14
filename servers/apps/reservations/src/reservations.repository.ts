import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
// import { ReservationDocument } from './models/reservation.mongo.schema';
import { ReservationRES } from './models/reservation.mysql.entity';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RoomRES } from './models/rooms.mysql.entity';
import { HotelRES } from './models/hotel.mysql.entity';
import { UserRES } from './models/users.mysql.entity';

// @Injectable()
// export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
//   protected readonly logger = new Logger(ReservationsRepository.name);

//   constructor(
//     @InjectModel(ReservationDocument.name)
//     reservationModel: Model<ReservationDocument>,
//   ) {
//     super(reservationModel);
//   }
// }
@Injectable()
export class ReservationsRepositorymySQL extends AbstractRepositorymySQL<ReservationRES> {
  protected readonly logger = new Logger(ReservationsRepositorymySQL.name);

  constructor(
    @InjectRepository(ReservationRES)
    ReservationsRepository: Repository<ReservationRES>,
    entityManager: EntityManager,
  ) {
    super(ReservationsRepository, entityManager);
  }
}

@Injectable()
export class RoomRepositorySQL extends AbstractRepositorymySQL<RoomRES> {
  protected readonly logger = new Logger(RoomRepositorySQL.name);

  constructor(
    @InjectRepository(RoomRES)
    RoomRepository: Repository<RoomRES>,
    entityManager: EntityManager,
  ) {
    super(RoomRepository, entityManager);
  }
}

@Injectable()
export class HotelRepositorySQL extends AbstractRepositorymySQL<HotelRES> {
  protected readonly logger = new Logger(HotelRepositorySQL.name);

  constructor(
    @InjectRepository(HotelRES)
    HotelRepository: Repository<HotelRES>,
    entityManager: EntityManager,
  ) {
    super(HotelRepository, entityManager);
  }
}

@Injectable()
export class UserRepositorySQL extends AbstractRepositorymySQL<UserRES> {
  protected readonly logger = new Logger(UserRepositorySQL.name);

  constructor(
    @InjectRepository(UserRES)
    UserRepository: Repository<UserRES>,
    entityManager: EntityManager,
  ) {
    super(UserRepository, entityManager);
  }
}
