import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TasksAttachTASKS } from '../../models/tasks-attachement.entity';
import { EmployeeTASKS } from '../../models/employee.entity';
@Injectable()
export class TasksAttachementRepositorymySQL extends AbstractRepositorymySQL<TasksAttachTASKS> {
  protected readonly logger = new Logger(TasksAttachementRepositorymySQL.name);

  constructor(
    @InjectRepository(TasksAttachTASKS)
    TasksAttachementRepository: Repository<TasksAttachTASKS>,
    entityManager: EntityManager,
  ) {
    super(TasksAttachementRepository, entityManager);
  }
}
@Injectable()
export class EmployeeRepositorymySQL extends AbstractRepositorymySQL<EmployeeTASKS> {
  protected readonly logger = new Logger(EmployeeRepositorymySQL.name);

  constructor(
    @InjectRepository(EmployeeTASKS)
    EmployeeRepository: Repository<EmployeeTASKS>,
    entityManager: EntityManager,
  ) {
    super(EmployeeRepository, entityManager);
  }
}
