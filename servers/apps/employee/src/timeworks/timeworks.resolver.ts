import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TimeworksService } from './timeworks.service';
import { CreateTimeworkInput } from './dto/create-timework.input';
import { UpdateTimeworkInput } from './dto/update-timework.input';
import { TimeWorkEMP } from '../models/time-work.schema';
import { CurrentUser } from '@app/shared';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';

@Resolver(() => TimeWorkEMP)
export class TimeworksResolver {
  constructor(private readonly timeworksService: TimeworksService) {}

  @Mutation(() => TimeWorkEMP)
  createTimework(
    @Args('createTimeworkInput')
    createTimeworkInput: CreateTimeworkInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.timeworksService.create(createTimeworkInput, user);
  }

  @Query(() => [TimeWorkEMP], { name: 'timeworks' })
  findAll() {
    return this.timeworksService.findAll();
  }

  @Query(() => TimeWorkEMP, { name: 'timework' })
  findOne(@Args('id', { type: () => Number }) id: number) {
    return this.timeworksService.findOne(id);
  }

  @Mutation(() => TimeWorkEMP)
  async updateTimework(
    @Args('id') id: number,
    @Args('updateTimeworkInputs')
    updateTimeWorkInput: UpdateTimeworkInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.timeworksService.update(id, updateTimeWorkInput, user);
  }

  @Mutation(() => TimeWorkEMP)
  removeTimework(@Args('id', { type: () => Int }) id: number) {
    return this.timeworksService.remove(id);
  }
}
