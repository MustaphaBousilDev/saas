import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { AttachementService } from './attachement.service';
import { TasksAttachTASKS } from '../../models/tasks-attachement.entity';
import { TaskAttachementInput } from '../../dto/task-attachement.dto';
import { Query } from '@nestjs/graphql';
import { TaskAttachementUpdateDTO } from '../../dto/task-attachement-update.dto';
@Resolver(() => TasksAttachTASKS)
export class AttachementResolver {
  constructor(private readonly attachementService: AttachementService) {}

  @Mutation(() => TasksAttachTASKS)
  createAttachement(
    @Args('createAttachementInput')
    createAttachementInput: TaskAttachementInput,
  ) {
    return this.attachementService.create(createAttachementInput);
  }

  @Query(() => [TasksAttachTASKS], { name: 'attachementsTask' })
  findAll() {
    return this.attachementService.findAll();
  }

  @Query(() => TasksAttachTASKS, { name: 'attachement' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.attachementService.findOne(id);
  }

  @Mutation(() => TasksAttachTASKS)
  updateAttachement(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAttachementInput')
    updateAttachementInput: TaskAttachementUpdateDTO,
  ) {
    return this.attachementService.update(id, updateAttachementInput);
  }

  @Mutation(() => TasksAttachTASKS)
  removeAttachement(@Args('id', { type: () => Int }) id: number) {
    return this.attachementService.remove(id);
  }
}
