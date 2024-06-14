import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
//import { UpdateReservationDto } from './dto/update-reservation.dto';
import {
  HotelRepositorySQL,
  ReservationsRepositorymySQL,
  RoomRepositorySQL,
  UserRepositorySQL,
} from './reservations.repository';
import { PAYMENT_SERVICE } from '@app/shared';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { ReservationRES } from './models/reservation.mysql.entity';
//import { UserRES } from './models/users.mysql.entity';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationsRepositorymySQL,
    private readonly userRepository: UserRepositorySQL,
    private readonly hotelRepository: HotelRepositorySQL,
    private readonly roomRepository: RoomRepositorySQL,
    @Inject(PAYMENT_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  async create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UserInfoDto,
  ) {
    console.log('################## email');
    console.log(email);
    const {
      hotel: hotels,
      room: rooms,
      ...reservationDTO
    } = createReservationDto;
    console.log(rooms);
    console.log(hotels);
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    const room = await this.roomRepository.findOne({
      _id: createReservationDto.room.id,
    });
    const hotel = await this.hotelRepository.findOne({
      _id: createReservationDto.hotel.id,
    });
    return this.paymentsService
      .send('create_charge', {
        ...reservationDTO.charge,
        email, //for using in notifications microservice
      }) //send is used to send a message to the microservice and 'create_charge' is the pattern that the microservice is listening for and createReservationDto.charge is the data that is sent to the microservice
      .pipe(
        //tap is used to perform side effects on the data coming in from the microservice in other words it is used to perform operations on the data coming in from the microservice(for example logging the data coming in from the microservice)
        //map is used to handle asynchronous operations
        map((res) => {
          const reservation = new ReservationRES({
            ...reservationDTO,
            //id of payment in stripe
            invoiceId: res.id,
            timestamp: new Date(),
            user: user,
            room: room,
            hotel: hotel,
          });
          return this.reservationRepository.create(reservation);
        }),
      );
  }

  async findAll() {
    return this.reservationRepository.find({});
  }

  async findOne(_id: any) {
    return this.reservationRepository.findOne({ _id });
  }

  /*async update(_id: any, updateReservationDto: UpdateReservationDto) {
    //return this.reservationRepository.findOneAndUpdate(
      //{ _id },
      //updateReservationDto, // for typeORM
      // { $set: updateReservationDto }, # for mongo
    //);
  }*/

  async remove(_id: any) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
