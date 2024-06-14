import { Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { TagRepositorymySQL, UserRepositorySQL } from './tags.repository';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { TagsSTOCK } from '../../models';

@Injectable()
export class TagsService {
  constructor(
    private readonly userRepository: UserRepositorySQL,
    private readonly tagsRepository: TagRepositorymySQL,
  ) {}
  async create(createTagInput: CreateTagInput, { _id: userId }: UserInfoDto) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    const tags = new TagsSTOCK({
      ...createTagInput,
      user,
    });
    return this.tagsRepository.create(tags);
  }

  findAll() {
    return this.tagsRepository.find({});
  }

  findOne(_id: number) {
    return this.tagsRepository.findOne({ _id });
  }

  async update(
    _id: number,
    updateTagInput: UpdateTagInput,
    { _id: userId }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    updateTagInput['user'] = user;
    return this.tagsRepository.findOneAndUpdate({ _id }, updateTagInput);
  }

  remove(_id: number) {
    return this.tagsRepository.findOneAndDelete({ _id });
  }
}
