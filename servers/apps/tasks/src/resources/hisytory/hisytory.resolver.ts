import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HisytoryService } from './hisytory.service';
import { Task_HistoryTASKS } from '../../models/task-history.entity';
import { TasksHistoryDtoInput } from '../../dto/task-history.dto';
import { TasksHistoryUpdateDTO } from '../../dto/task-history-update.dto';

@Resolver(() => Task_HistoryTASKS)
export class HisytoryResolver {
  constructor(private readonly hisytoryService: HisytoryService) {}

  @Mutation(() => Task_HistoryTASKS)
  createHisytory(
    @Args('createHisytoryInput') createHisytoryInput: TasksHistoryDtoInput,
  ) {
    return this.hisytoryService.create(createHisytoryInput);
  }

  @Query(() => [Task_HistoryTASKS], { name: 'hisytories' })
  findAllHistory() {
    return this.hisytoryService.findAll();
  }

  @Query(() => Task_HistoryTASKS, { name: 'hisytory' })
  findOneHistory(@Args('id', { type: () => Int }) id: number) {
    return this.hisytoryService.findOne(id);
  }

  @Mutation(() => Task_HistoryTASKS)
  updateHisytory(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateHisytoryInput')
    updateHisytoryInput: TasksHistoryUpdateDTO,
  ) {
    return this.hisytoryService.update(id, updateHisytoryInput);
  }

  @Mutation(() => Task_HistoryTASKS)
  removeHisytory(@Args('id', { type: () => Int }) id: number) {
    return this.hisytoryService.remove(id);
  }
}
