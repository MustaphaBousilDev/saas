import { Injectable } from '@nestjs/common';
import { CreateSubcategoriryInput } from './dto/create-subcategoriry.input';
import { UpdateSubcategoriryInput } from './dto/update-subcategoriry.input';
import {
  CategoryRepositorymySQL,
  SubCategoryRepositorymySQL,
  UserRepositorymySQL,
} from './subcategories.repository';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { SubCategorySTOCK } from '../../models';

@Injectable()
export class SubcategoririesService {
  constructor(
    private readonly subCategoryRepository: SubCategoryRepositorymySQL,
    private readonly categoryRepository: CategoryRepositorymySQL,
    private readonly userRepository: UserRepositorymySQL,
  ) {}
  async create(
    createSubcategoriryInput: CreateSubcategoriryInput,
    { _id: userId }: UserInfoDto,
  ) {
    try {
      const { category: categoryDTO, ...createDTO } = createSubcategoriryInput;
      console.log(categoryDTO);
      const [user, category] = await Promise.all([
        this.userRepository.findOne({
          _id: userId,
        }),
        this.categoryRepository.findOne({
          _id: categoryDTO.id,
        }),
      ]);
      if (!user || !category) {
        throw new Error('Failed to fetch required data');
      }
      const subCategory = new SubCategorySTOCK({
        ...createDTO,
        user,
        category,
      });
      return this.subCategoryRepository.create(subCategory);
    } catch (e) {
      console.error('Error in creating product', e);
      return false;
    }
  }

  findAll() {
    return this.subCategoryRepository.find({});
  }

  findOne(_id: number) {
    return this.subCategoryRepository.findOne({ _id });
  }

  async update(
    _id: number,
    updateSubCategoryDTO: UpdateSubcategoriryInput,
    { _id: userId }: UserInfoDto,
  ) {
    const { category: categoryDTOUpdate, ...updateDTO } = updateSubCategoryDTO;
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    updateDTO['user'] = user;
    if (categoryDTOUpdate && categoryDTOUpdate.id) {
      const categoryUpdate = await this.categoryRepository.findOne({
        _id: categoryDTOUpdate.id,
      });
      if (categoryUpdate) {
        updateDTO['category'] = categoryUpdate;
      }
    }
    return this.subCategoryRepository.findOneAndUpdate({ _id }, updateDTO);
  }

  remove(_id: number) {
    return this.subCategoryRepository.findOneAndDelete({ _id });
  }
}
