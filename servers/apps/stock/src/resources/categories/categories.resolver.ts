import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CurrentUser } from '@app/shared';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { CategorySTOCK } from '../../models';

@Resolver(() => CategorySTOCK)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => CategorySTOCK)
  createCategory(
    @Args('createCategoryInput')
    createCategoryInput: CreateCategoryInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.categoriesService.create(createCategoryInput, user);
  }

  @Query(() => [CategorySTOCK], { name: 'categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query(() => CategorySTOCK, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => CategorySTOCK)
  updateCategory(
    @Args('id') id: number,
    @Args('updateCategoryInput')
    updateCategoryInput: UpdateCategoryInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.categoriesService.update(id, updateCategoryInput, user);
  }

  @Mutation(() => CategorySTOCK)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.remove(id);
  }
}
