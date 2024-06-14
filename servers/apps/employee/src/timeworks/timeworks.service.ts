import { Injectable } from '@nestjs/common';
import { CreateTimeworkInput } from './dto/create-timework.input';
import { UpdateTimeworkInput } from './dto/update-timework.input';
import {
  TimeWorkRepositorymySQL,
  UserRepositorymySQL,
} from './timeworks.repository';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { TimeWorkEMP } from '../models/time-work.schema';

@Injectable()
export class TimeworksService {
  constructor(
    private readonly userRepository: UserRepositorymySQL,
    private readonly timeWorkRepository: TimeWorkRepositorymySQL,
  ) {}
  async create(
    createTimeWorkInput: CreateTimeworkInput,
    { _id: userId }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    if (user) {
      const saveTimeWork = new TimeWorkEMP({
        ...createTimeWorkInput,
        user: user,
      });
      return this.timeWorkRepository.create(saveTimeWork);
    }
    return false;
  }

  async findAll() {
    return this.timeWorkRepository.find({});
  }

  async findOne(_id: number) {
    return this.timeWorkRepository.findOne({ _id });
  }

  async update(
    _id: any,
    updateTimeWorkDTO: UpdateTimeworkInput,
    { _id: userId }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    if (user) {
      updateTimeWorkDTO['user'] = user;
      return this.timeWorkRepository.findOneAndUpdate(
        { _id },
        updateTimeWorkDTO,
      );
    }
  }

  async remove(_id: number) {
    await this.timeWorkRepository.findOneAndDelete({ _id });
  }
}
