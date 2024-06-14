import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TasksTASKS } from '../../models/tasks.entity';
import { EmployeeTASKS } from '../../models/employee.entity';
import { Task_HistoryTASKS } from '../../models/task-history.entity';

@Injectable()
export class TasksRepositorymySQL extends AbstractRepositorymySQL<TasksTASKS> {
  protected readonly logger = new Logger(TasksRepositorymySQL.name);

  constructor(
    @InjectRepository(TasksTASKS)
    TasksRepository: Repository<TasksTASKS>,
    entityManager: EntityManager,
  ) {
    super(TasksRepository, entityManager);
  }
}

@Injectable()
export class TaskHistoryRepositorymySQL extends AbstractRepositorymySQL<Task_HistoryTASKS> {
  protected readonly logger = new Logger(TaskHistoryRepositorymySQL.name);

  constructor(
    @InjectRepository(Task_HistoryTASKS)
    TaskHistoryRepository: Repository<Task_HistoryTASKS>,
    entityManager: EntityManager,
  ) {
    super(TaskHistoryRepository, entityManager);
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
