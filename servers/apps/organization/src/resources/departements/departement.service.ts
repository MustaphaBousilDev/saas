import { Injectable } from '@nestjs/common';
import { DepartementRepositorySQL } from './departement.repository';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { CreateDepartementInput } from './dto/create-departement.input';
import { DepartementORG } from '../../models/departement.schema';
import { UpdateDepartementInput } from './dto/update-departement.input';
import { UserRepositorySQLForRoom } from '../users/users.repository';

@Injectable()
export class DepartementService {
  constructor(
    private readonly departementRepository: DepartementRepositorySQL,
    private readonly userRepository: UserRepositorySQLForRoom,
  ) {}
  async create(
    createDepartementDto: CreateDepartementInput,
    { _id: user_id }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: user_id,
    });
    if (user) {
      const departement = new DepartementORG({
        name: createDepartementDto.name,
        description: createDepartementDto.description,
        status: createDepartementDto.status,
        image: createDepartementDto.image,
        user: user,
      });
      return this.departementRepository.create(departement);
    }
  }

  async findAll() {
    return this.departementRepository.find({});
  }

  async findOne(_id: any) {
    return this.departementRepository.findOne({ _id });
  }

  async update(
    _id: any,
    updateDepartementDto: UpdateDepartementInput,
    { _id: user_id }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: user_id,
    });
    if (user) {
      updateDepartementDto['user'] = user;
    }
    return this.departementRepository.findOneAndUpdate(
      { _id },
      updateDepartementDto,
    );
  }

  remove(_id: any) {
    this.departementRepository.findOneAndDelete({ _id });
  }
}
