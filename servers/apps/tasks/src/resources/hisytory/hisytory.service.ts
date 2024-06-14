import { Injectable } from '@nestjs/common';
import {
  EmployeeRepositorymySQL,
  TaskHistoryRepositorymySQL,
  TasksRepositorymySQL,
} from './history.repository';
import { TasksHistoryDtoInput } from '../../dto/task-history.dto';
import { TasksHistoryUpdateDTO } from '../../dto/task-history-update.dto';
import { Task_HistoryTASKS } from '../../models/task-history.entity';

@Injectable()
export class HisytoryService {
  constructor(
    private readonly hisytoryRepository: TaskHistoryRepositorymySQL,
    private readonly taskRepository: TasksRepositorymySQL,
    private readonly employeeRepository: EmployeeRepositorymySQL,
  ) {}
  async create(createTaskHistoryInput: TasksHistoryDtoInput) {
    const employee = await this.employeeRepository.findOne({
      _id: createTaskHistoryInput.employees.id,
    });
    const task = await this.taskRepository.findOne({
      _id: createTaskHistoryInput.task.id,
    });
    const taskHistory = new Task_HistoryTASKS({
      ...createTaskHistoryInput,
      task: task,
      employee: employee,
    });
    return this.hisytoryRepository.create(taskHistory);
  }

  findAll() {
    return this.hisytoryRepository.find({});
  }

  findOne(id: number) {
    return this.hisytoryRepository.findOne({ _id: id });
  }

  async update(_id: any, updateTaskHistoryDto: TasksHistoryUpdateDTO) {
    const { employees, task, ...data } = updateTaskHistoryDto;
    console.log(employees);
    console.log(task);
    let emplHistory = null;
    let empTask = null;
    if (updateTaskHistoryDto.employees && updateTaskHistoryDto.employees.id) {
      emplHistory = await this.employeeRepository.findOne({
        _id: updateTaskHistoryDto.employees.id,
      });
      if (emplHistory) {
        data['employee'] = emplHistory;
      }
    }
    if (updateTaskHistoryDto.task && updateTaskHistoryDto.task.id) {
      empTask = await this.taskRepository.findOne({
        _id: updateTaskHistoryDto.task.id,
      });
      if (empTask) {
        data['task'] = empTask;
      }
    }
    return this.hisytoryRepository.findOneAndUpdate({ _id }, data);
  }

  async remove(id: number) {
    await this.hisytoryRepository.findOneAndDelete({ _id: id });
    return { message: 'Success Delete History ' };
  }
}
