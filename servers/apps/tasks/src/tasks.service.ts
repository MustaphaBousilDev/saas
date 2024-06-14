import { Injectable } from '@nestjs/common';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import {
  EmployeeRepositorymySQL,
  TaskAttachementRepositorymySQL,
  TasksRepositorymySQL,
  TasksTypeRepositorymySQL,
} from './tasks.repository';
import { TasksDtoInput } from './dto/tasks.dto';
import { TasksTASKS } from './models/tasks.entity';
import { In } from 'typeorm';
import { TasksDtoUpdate } from './dto/tasks-update.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepositorymySQL,
    private readonly tasksTypeRepository: TasksTypeRepositorymySQL,
    private readonly tasksAttachementRepository: TaskAttachementRepositorymySQL,
    private readonly employeeRepository: EmployeeRepositorymySQL,
  ) {}

  async create(createTasksDto: TasksDtoInput, { _id: userId }: UserInfoDto) {
    const taskType = await this.tasksTypeRepository.findOne({
      _id: createTasksDto.taskType.id,
    });
    const taskAttachement = await this.tasksAttachementRepository.findOne({
      _id: createTasksDto.taskAttachement.id,
    });
    const ids = [];
    createTasksDto.employees.forEach((emp) => {
      ids.push(emp.id);
    });
    const employee = await this.employeeRepository.findMany({
      where: {
        _id: In(ids),
      },
    });
    const organization = new TasksTASKS({
      name: createTasksDto.name,
      description: createTasksDto.description,
      status: createTasksDto.status,
      priority: createTasksDto.priority,
      date: createTasksDto.date,
      time: createTasksDto.time,
      dueDate: createTasksDto.dueDate,
      taskType: taskType,
      taskAttachement: taskAttachement,
      employees: employee,
    });
    return this.tasksRepository.create(organization);
  }

  async findAll() {
    return this.tasksRepository.find({});
  }

  async findOne(_id: any) {
    return this.tasksRepository.findOne({ _id });
  }

  async update(
    _id: any,
    updateTasksDto: TasksDtoUpdate,
    { _id: userId }: UserInfoDto,
  ) {
    const { taskAttachement, taskType, employees, ...updateObject } =
      updateTasksDto;
    console.log(taskAttachement);
    console.log(taskType);
    console.log(employees);
    const newObjUpdate = updateObject;
    // Conditionally fetch and insert taskType if it's not null
    if (updateTasksDto.taskType && updateTasksDto.taskType.id) {
      const taskType = await this.tasksTypeRepository.findOne({
        _id: updateTasksDto.taskType.id,
      });
      if (taskType) {
        newObjUpdate['taskType'] = taskType;
      }
    }
    // Conditionally fetch and insert taskAttachement if it's not null
    if (updateTasksDto.taskAttachement && updateTasksDto.taskAttachement.id) {
      const taskAttachement = await this.tasksAttachementRepository.findOne({
        _id: updateTasksDto.taskAttachement.id,
      });
      if (taskAttachement) {
        updateObject['taskAttachement'] = taskAttachement;
      }
    }
    // Conditionally fetch and insert employees if they're not null
    if (updateTasksDto.employees && updateTasksDto.employees.length > 0) {
      const employeeIds = updateTasksDto.employees.map(
        (employee) => employee.id,
      );
      /*const employeesUpdated = await this.employeeRepository.findMany({
        where: {
          _id: In(employeeIds),
        },
      });
      if (employeesUpdated) {
        updateObject['employees'] = employeesUpdated;
      }*/
      // updateObject['employees'] = employees;
      console.log('############################# update');
      console.log(updateObject);
    }
    return this.tasksRepository.findOneAndUpdate({ _id }, updateObject);
  }

  async remove(_id: any) {
    console.log('############# coming to here');
    console.log(_id);
    await this.tasksRepository.findOneAndDelete({ _id });
  }
}
