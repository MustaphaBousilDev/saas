import { Injectable } from '@nestjs/common';
import {
  EmployeeRepositorymySQL,
  TasksAttachementRepositorymySQL,
} from './attachement.repository';
import { TaskAttachementInput } from '../../dto/task-attachement.dto';
import { TasksAttachTASKS } from '../../models/tasks-attachement.entity';
import { TaskAttachementUpdateDTO } from '../../dto/task-attachement-update.dto';

@Injectable()
export class AttachementService {
  constructor(
    private readonly taskAttachementRepository: TasksAttachementRepositorymySQL,
    private readonly employeeRepository: EmployeeRepositorymySQL,
  ) {}
  async create(createAttachementInput: TaskAttachementInput) {
    const employee = await this.employeeRepository.findOne({
      _id: createAttachementInput.employee.id,
    });
    const taskAttachement = new TasksAttachTASKS({
      name: createAttachementInput.name,
      file_name: createAttachementInput.file_name,
      file_url: createAttachementInput.file_url,
      employee: employee,
    });
    return this.taskAttachementRepository.create(taskAttachement);
  }

  async findAll() {
    return this.taskAttachementRepository.find({});
  }

  async findOne(_id: any) {
    return this.taskAttachementRepository.findOne({ _id });
  }
  async update(
    _id: any,
    updateAttachementDto: TaskAttachementUpdateDTO,
    // { _id: userId }: UserInfoDto,
  ) {
    //create object that except values from updateAttachementDto except employee using spread operator
    const { employee, ...data } = updateAttachementDto;
    // newObjUpdate = entity;
    let employees = null;
    // Conditionally fetch and insert taskType if it's not null
    if (updateAttachementDto.employee && updateAttachementDto.employee.id) {
      employees = await this.employeeRepository.findOne({
        _id: updateAttachementDto.employee.id,
      });
      if (employee) {
        data['employee'] = employees;
      }
    }
    return this.taskAttachementRepository.findOneAndUpdate({ _id }, data);
  }

  async remove(_id: any) {
    console.log('############# coming to here');
    console.log(_id);
    await this.taskAttachementRepository.findOneAndDelete({ _id });
    return { message: 'Success Delete TasksType' };
  }
}
