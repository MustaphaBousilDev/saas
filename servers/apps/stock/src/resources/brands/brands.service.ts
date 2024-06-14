import { Injectable } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { BrandRepositorymySQL, UserRepositorySQL } from './brands.repository';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { BrandSTOCK } from '../../models';

@Injectable()
export class BrandsService {
  constructor(
    private readonly userRepository: UserRepositorySQL,
    private readonly brandRepository: BrandRepositorymySQL,
  ) {}
  async create(
    createBrandInput: CreateBrandInput,
    { _id: userId }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    const brand = new BrandSTOCK({
      ...createBrandInput,
      user: user,
    });
    return this.brandRepository.create(brand);
  }

  async findOne(_id: any) {
    return this.brandRepository.findOne({ _id });
  }

  async findAll() {
    return this.brandRepository.find({});
  }

  async update(
    _id: any,
    updateBrandDto: UpdateBrandInput,
    { _id: userId }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    updateBrandDto['user'] = user;
    return this.brandRepository.findOneAndUpdate({ _id }, updateBrandDto);
  }

  async remove(_id: any) {
    return this.brandRepository.findOneAndDelete({ _id });
  }
}
