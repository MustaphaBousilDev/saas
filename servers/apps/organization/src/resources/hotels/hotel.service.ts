import { Injectable } from '@nestjs/common';
import {
  CityRepositorySQL,
  DepartementRepositorySQL,
  HotelRepositorySQL,
  OrganizationRepositorySQL,
} from './hotel.repository';
import { In } from 'typeorm';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { CreateHotelInput } from './dto/create-hotel.input';
import { HotelORG } from '../../models/hotel.schema';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { UserRepositorySQLForRoom } from '../users/users.repository';

@Injectable()
export class HotelService {
  constructor(
    private readonly hotelRepository: HotelRepositorySQL,
    private readonly userRepository: UserRepositorySQLForRoom,
    private readonly cityRepository: CityRepositorySQL,
    private readonly organizationRepository: OrganizationRepositorySQL,
    private readonly departementRepository: DepartementRepositorySQL,
  ) {}
  async create(
    createHotelDto: CreateHotelInput,
    { _id: user_id }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: user_id,
    });
    const city = await this.cityRepository.findOne({
      _id: createHotelDto.city.id,
    });
    const organization = await this.organizationRepository.findOne({
      _id: createHotelDto.organization.id,
    });
    const ids = [];
    createHotelDto.departements.forEach((departement) => {
      ids.push(departement.id);
    });
    const departement = await this.departementRepository.findMany({
      where: {
        _id: In(ids),
      },
    });
    console.log('######################################');
    console.log(user);
    console.log(city);
    console.log(organization);
    console.log(departement);
    if (user && city && organization && departement) {
      const hotel = new HotelORG({
        name: createHotelDto?.name,
        address: createHotelDto?.address,
        organization: organization,
        city: city,
        user: user,
        phone: createHotelDto?.phone,
        email: createHotelDto?.email,
        description: createHotelDto?.description,
        image: createHotelDto?.image,
        latitude: createHotelDto?.latitude,
        longitude: createHotelDto?.longitude,
        status: createHotelDto?.status,
        departments: departement,
      });
      return this.hotelRepository.create(hotel);
    }

    return false;
  }

  async findAll() {
    return this.hotelRepository.find({});
  }

  async findOne(_id: any) {
    return this.hotelRepository.findOne({ _id });
  }

  async update(
    _id: any,
    updateHotelDto: UpdateHotelInput,
    { _id: user_id }: UserInfoDto,
  ) {
    const { organization, departements, city, ...updateDTO } = updateHotelDto;
    console.log(organization, city, departements);
    if (updateHotelDto.city && updateHotelDto.city.id) {
      const city = await this.cityRepository.findOne({
        _id: updateHotelDto.city.id,
      });
      if (city) {
        updateDTO['city'] = city;
      }
    }
    if (updateHotelDto.organization && updateHotelDto.organization.id) {
      const organization = await this.organizationRepository.findOne({
        _id: updateHotelDto.organization.id,
      });
      if (organization) {
        updateDTO['organization'] = organization;
      }
    }
    const user = await this.userRepository.findOne({
      _id: user_id,
    });
    if (user) {
      updateDTO['user'] = user;
    }
    return this.hotelRepository.findOneAndUpdate({ _id }, updateDTO);
  }

  async remove(_id: any) {
    await this.hotelRepository.findOneAndDelete({ _id });
  }
}
