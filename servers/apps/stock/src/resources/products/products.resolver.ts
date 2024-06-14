import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { CurrentUser } from '@app/shared';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { ProductSTOCK } from '../../models';

@Resolver(() => ProductSTOCK)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => ProductSTOCK)
  createProduct(
    @Args('createProductInput')
    createProductInput: CreateProductInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.productsService.create(createProductInput, user);
  }

  @Query(() => [ProductSTOCK], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => ProductSTOCK, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => ProductSTOCK)
  updateProduct(
    @Args('id') id: number,
    @Args('updateProductInput')
    updateProductInput: UpdateProductInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.productsService.update(id, updateProductInput, user);
  }

  @Mutation(() => ProductSTOCK)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
