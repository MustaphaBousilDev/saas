import { Injectable } from '@nestjs/common';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import {
  SupplierRepositorymySQL,
  UserRepositorySQL,
} from './supplier.repository';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { SuppliersSTOCK } from '../../models';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly userRepository: UserRepositorySQL,
    private readonly supplierRepository: SupplierRepositorymySQL,
  ) {}
  async create(
    createSupplierInput: CreateSupplierInput,
    { _id: userId }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    const supplier = new SuppliersSTOCK({
      ...createSupplierInput,
      user,
    });
    return this.supplierRepository.create(supplier);
  }

  async findAll() {
    return this.supplierRepository.find({});
  }

  async findOne(_id: number) {
    return this.supplierRepository.findOne({ _id });
  }

  async update(
    _id: number,
    updateSupplierInput: UpdateSupplierInput,
    { _id: userId }: UserInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    updateSupplierInput['user'] = user;
    return this.supplierRepository.findOneAndUpdate(
      { _id },
      updateSupplierInput,
    );
  }

  async remove(_id: number) {
    await this.supplierRepository.findOneAndDelete({ _id });
  }
}
