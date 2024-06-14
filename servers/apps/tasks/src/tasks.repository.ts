import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TasksTASKS } from './models/tasks.entity';
import { TasksTypeTASKS } from './models/tasks-type.entity';
import { EmployeeTASKS } from './models/employee.entity';
import { TasksAttachTASKS } from './models/tasks-attachement.entity';

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
export class TasksTypeRepositorymySQL extends AbstractRepositorymySQL<TasksTypeTASKS> {
  protected readonly logger = new Logger(TasksTypeRepositorymySQL.name);

  constructor(
    @InjectRepository(TasksTypeTASKS)
    TasksTypeRepository: Repository<TasksTypeTASKS>,
    entityManager: EntityManager,
  ) {
    super(TasksTypeRepository, entityManager);
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

@Injectable()
export class TaskAttachementRepositorymySQL extends AbstractRepositorymySQL<TasksAttachTASKS> {
  protected readonly logger = new Logger(TaskAttachementRepositorymySQL.name);

  constructor(
    @InjectRepository(TasksAttachTASKS)
    TaskAttachementRepository: Repository<TasksAttachTASKS>,
    entityManager: EntityManager,
  ) {
    super(TaskAttachementRepository, entityManager);
  }
}
