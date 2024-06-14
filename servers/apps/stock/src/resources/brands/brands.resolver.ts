import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrandsService } from './brands.service';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { CurrentUser } from '@app/shared';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { BrandSTOCK } from '../../models';

@Resolver(() => BrandSTOCK)
export class BrandsResolver {
  constructor(private readonly brandsService: BrandsService) {}

  @Mutation(() => BrandSTOCK)
  createBrand(
    @Args('createBrandInput')
    createBrandInput: CreateBrandInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.brandsService.create(createBrandInput, user);
  }

  @Query(() => [BrandSTOCK], { name: 'brands' })
  findAll() {
    return this.brandsService.findAll();
  }

  @Query(() => BrandSTOCK, { name: 'brand' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.brandsService.findOne(id);
  }

  @Mutation(() => BrandSTOCK)
  updateBrand(
    @Args('id') id: number,
    @Args('updateBrandInput')
    updateBrandInput: UpdateBrandInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.brandsService.update(id, updateBrandInput, user);
  }

  @Mutation(() => BrandSTOCK)
  removeBrand(@Args('id', { type: () => Int }) id: number) {
    return this.brandsService.remove(id);
  }
}
