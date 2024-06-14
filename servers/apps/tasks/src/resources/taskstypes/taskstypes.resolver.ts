import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskstypesService } from './taskstypes.service';
import { TasksTypeDtoInput } from '../../dto/tasks-type.dto';
import { TasksTypeTASKS } from '../../models/tasks-type.entity';
import { TaskTypeDtoUpdate } from '../../dto/task-type-update.dto';

@Resolver(() => TasksTypeTASKS)
export class TaskstypesResolver {
  constructor(private readonly taskstypesService: TaskstypesService) {}

  @Mutation(() => TasksTypeTASKS)
  createTaskstype(
    @Args('createTaskstypeInput')
    createTaskstypeInput: TasksTypeDtoInput,
  ) {
    console.log('~~é~#########################');
    console.log(createTaskstypeInput);
    return this.taskstypesService.create(createTaskstypeInput);
  }

  @Query(() => [TasksTypeTASKS], { name: 'taskstypes' })
  findAllTasks() {
    return this.taskstypesService.findAll();
  }

  @Query(() => TasksTypeTASKS, { name: 'taskstype' })
  findTaskType(@Args('id', { type: () => Int }) id: number) {
    return this.taskstypesService.findOne(id);
  }

  @Mutation(() => TasksTypeTASKS)
  updateTaskstype(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateTaskstypeInput')
    updateTaskstypeInput: TaskTypeDtoUpdate,
  ) {
    return this.taskstypesService.update(id, updateTaskstypeInput);
  }

  @Mutation(() => TasksTypeTASKS, { name: 'removeTaskstype' })
  removeTaskstype(@Args('id', { type: () => Int }) id: number) {
    return this.taskstypesService.remove(id);
  }
}
