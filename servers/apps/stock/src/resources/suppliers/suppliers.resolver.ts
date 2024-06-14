import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { CurrentUser } from '@app/shared';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { SuppliersSTOCK } from '../../models';

@Resolver(() => SuppliersSTOCK)
export class SuppliersResolver {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Mutation(() => SuppliersSTOCK)
  createSupplier(
    @Args('createSupplierInput')
    createSupplierInput: CreateSupplierInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.suppliersService.create(createSupplierInput, user);
  }

  @Query(() => [SuppliersSTOCK], { name: 'suppliers' })
  findAll() {
    return this.suppliersService.findAll();
  }

  @Query(() => SuppliersSTOCK, { name: 'supplier' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.suppliersService.findOne(id);
  }

  @Mutation(() => SuppliersSTOCK)
  updateSupplier(
    @Args('id') _id: number,
    @Args('updateSupplierInput')
    updateSupplierInput: UpdateSupplierInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.suppliersService.update(_id, updateSupplierInput, user);
  }

  @Mutation(() => SuppliersSTOCK)
  removeSupplier(@Args('id', { type: () => Int }) id: number) {
    return this.suppliersService.remove(id);
  }
}
