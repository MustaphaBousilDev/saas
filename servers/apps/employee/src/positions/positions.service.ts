import { Injectable } from '@nestjs/common';
import { CreatePositionInput } from './dto/create-position.input';
import { UpdatePositionInput } from './dto/update-position.input';
import {
  PositionRepositorymySQL,
  UserRepositorymySQL,
} from './positions.repository';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { PositionEMP } from '../models/position.schema';

@Injectable()
export class PositionsService {
  constructor(
    private readonly userRepository: UserRepositorymySQL,
    private readonly positionRepository: PositionRepositorymySQL,
  ) {}
  async create(
    createPositionInput: CreatePositionInput,
    { _id: userId }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    if (user) {
      const position = new PositionEMP({
        ...createPositionInput,
        user: user,
      });
      return this.positionRepository.create(position);
    }
    return false;
  }

  async findAll() {
    return this.positionRepository.find({});
  }

  async findOne(id: number) {
    return this.positionRepository.findOne({ _id: id });
  }

  async update(
    _id: any,
    updatePositionInput: UpdatePositionInput,
    { _id: userId }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    if (user) {
      updatePositionInput['user'] = user;
    }
    return this.positionRepository.findOneAndUpdate(
      { _id },
      updatePositionInput,
    );
  }

  async remove(id: number) {
    return this.positionRepository.findOneAndDelete({ _id: id });
  }
}
