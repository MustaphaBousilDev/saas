import { Injectable } from '@nestjs/common';
import { CreateRoomInput } from './dto/create-room.input';
import { HotelRepositorySQL, RoomRepositorySQL } from './room.repository';
//import { User } from '@app/shared';
import { RoomORG } from '../../models/rooms.schema';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { UpdateRoomInput } from './dto/update-room.input';
import { UserRepositorySQLForRoom } from '../users/users.repository';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepositorySQL,
    private readonly userRepository: UserRepositorySQLForRoom,
    private readonly hotelRepository: HotelRepositorySQL,
  ) {}
  async create(createRoomDto: CreateRoomInput, { _id: user_id }: UserInfoDto) {
    const user = await this.userRepository.findOne({
      _id: user_id,
    });
    const hotel = await this.hotelRepository.findOne({
      _id: createRoomDto.hotel.id,
    });
    if (user && hotel) {
      const room = new RoomORG({
        roomNumber: createRoomDto.roomNumber,
        type: createRoomDto.type,
        price: createRoomDto.price,
        description: createRoomDto.description,
        isAvailable: createRoomDto.isAvailable,
        image: createRoomDto.image,
        user: user,
        hotel: hotel,
      });
      return this.roomRepository.create(room);
    }

    return false;
  }

  async findAll() {
    return this.roomRepository.find({});
  }

  async findOne(_id: any) {
    return this.roomRepository.findOne({ _id });
  }

  async update(
    _id: any,
    updateWifiDto: UpdateRoomInput,
    { _id: user_id }: UserInfoDto,
  ) {
    console.log('### from service');
    const { hotel, ...updateDTO } = updateWifiDto;
    console.log('### from service 1');
    if (hotel && hotel.id) {
      const hotelSchema = await this.hotelRepository.findOne({
        _id: hotel.id,
      });
      const user = await this.userRepository.findOne({
        _id: user_id,
      });
      if (user) {
        updateDTO['user'] = user;
      }
      if (hotelSchema) {
        updateDTO['hotel'] = hotelSchema;
      }
      console.log('#### service');
      console.log(updateDTO);
    }
    return this.roomRepository.findOneAndUpdate({ _id }, updateDTO);
  }

  remove(_id: any) {
    this.roomRepository.findOneAndDelete({ _id });
  }
}
