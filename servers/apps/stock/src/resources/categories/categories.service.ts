import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import {
  CategoryRepositorymySQL,
  UserRepositorySQL,
} from './categories.repository';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { CategorySTOCK } from '../../models';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly userRepository: UserRepositorySQL,
    private readonly categoryRepository: CategoryRepositorymySQL,
  ) {}
  async create(
    createCategoryInput: CreateCategoryInput,
    { _id: userId }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    const categories = new CategorySTOCK({
      ...createCategoryInput,
      user: user,
    });
    return this.categoryRepository.create(categories);
  }

  async findAll() {
    return this.categoryRepository.find({});
  }

  async findOne(_id: number) {
    return this.categoryRepository.findOne({ _id });
  }

  async update(
    _id: any,
    updateCategoryDTO: UpdateCategoryInput,
    { _id: userId }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    updateCategoryDTO['user'] = user;
    return this.categoryRepository.findOneAndUpdate({ _id }, updateCategoryDTO);
  }

  async remove(_id: number) {
    return this.categoryRepository.findOneAndDelete({ _id });
  }
}
