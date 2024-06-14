import { Injectable } from '@nestjs/common';
import { CreateWifiInput } from './dto/create-wifi.input';
import { HotelRepositorySQL, WifiRepositorySQL } from './wifi.repository';
//import { User } from '@app/shared';
import { WifiORG } from '../../models/wifi.schema';
// import { UpdateWifiInput } from './dto/update-wifi.input';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { UpdateWifiInput } from './dto/update-wifi.input';
import { UserRepositorySQLForRoom } from '../users/users.repository';

@Injectable()
export class WifiService {
  constructor(
    private readonly wifiRepository: WifiRepositorySQL,
    private readonly userRepository: UserRepositorySQLForRoom,
    private readonly hotelRepository: HotelRepositorySQL,
  ) {}
  async create(createWifiDto: CreateWifiInput, { _id: userId }: UserInfoDto) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    const hotel = await this.hotelRepository.findOne({
      _id: createWifiDto.hotel.id,
    });
    if (user && hotel) {
      const wifi = new WifiORG({
        name: createWifiDto.name,
        ip: createWifiDto.ip,
        password: createWifiDto.password,
        user: user,
        hotel: hotel,
      });
      return this.wifiRepository.create(wifi);
    }
    return false;
  }

  async findAll() {
    return this.wifiRepository.find({});
  }

  async findOne(_id: any) {
    return this.wifiRepository.findOne({ _id });
  }

  async update(
    _id: any,
    updateWifiDto: UpdateWifiInput,
    { _id: user_id }: UserInfoDto,
  ) {
    const { hotel, ...updateDTO } = updateWifiDto;
    console.log(hotel);
    if (hotel && hotel.id) {
      const hotelSchema = await this.hotelRepository.findOne({
        _id: hotel.id,
      });
      const userSchema = await this.userRepository.findOne({
        _id: user_id,
      });
      if (hotelSchema) {
        updateDTO['hotel'] = hotel;
      }
      if (userSchema) {
        updateDTO['user'] = userSchema;
      }
    }
    return this.wifiRepository.findOneAndUpdate({ _id }, updateDTO);
  }

  remove(_id: any) {
    this.wifiRepository.findOneAndDelete({ _id });
  }
}
