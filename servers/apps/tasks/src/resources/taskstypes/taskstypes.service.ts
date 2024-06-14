import { Injectable } from '@nestjs/common';
import {
  DepartementRepositorymySQL,
  TasksTypeRepositorymySQL,
} from './tasksTypes.repository';
import { TasksTypeDtoInput } from '../../dto/tasks-type.dto';
import { TasksTypeTASKS } from '../../models/tasks-type.entity';
import { TaskTypeDtoUpdate } from '../../dto/task-type-update.dto';

@Injectable()
export class TaskstypesService {
  constructor(
    private readonly taskstypesRepository: TasksTypeRepositorymySQL,
    private readonly departementRepository: DepartementRepositorymySQL,
  ) {}

  async create(createTaskstypeInput: TasksTypeDtoInput) {
    const departement = await this.departementRepository.findOne({
      _id: createTaskstypeInput.departement.id,
    });
    const tasksType = new TasksTypeTASKS({
      name: createTaskstypeInput.name,
      departement: departement,
    });
    return this.taskstypesRepository.create(tasksType);
  }

  async findAll() {
    return this.taskstypesRepository.find({});
  }

  async findOne(_id: any) {
    return this.taskstypesRepository.findOne({ _id });
  }
  async update(
    _id: any,
    updateTasksDto: TaskTypeDtoUpdate,
    // { _id: userId }: UserInfoDto,
  ) {
    const newObjUpdate = {};
    if (updateTasksDto.name) {
      newObjUpdate['name'] = updateTasksDto.name;
    }
    // Conditionally fetch and insert taskType if it's not null
    if (updateTasksDto.departement && updateTasksDto.departement.id) {
      const departement = await this.departementRepository.findOne({
        _id: updateTasksDto.departement.id,
      });
      if (departement) {
        newObjUpdate['departement'] = departement;
      }
    }
    return this.taskstypesRepository.findOneAndUpdate({ _id }, newObjUpdate);
  }

  async remove(_id: any) {
    console.log('############# coming to here');
    console.log(_id);
    await this.taskstypesRepository.findOneAndDelete({ _id });
    return { message: 'Success Delete TasksType' };
  }
}
