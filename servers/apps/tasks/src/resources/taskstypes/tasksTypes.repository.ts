import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TasksTypeTASKS } from '../../models/tasks-type.entity';
import { DepartementTASKS } from '../../models/departement.entity';
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
export class DepartementRepositorymySQL extends AbstractRepositorymySQL<DepartementTASKS> {
  protected readonly logger = new Logger(DepartementRepositorymySQL.name);

  constructor(
    @InjectRepository(DepartementTASKS)
    DepartementRepository: Repository<DepartementTASKS>,
    entityManager: EntityManager,
  ) {
    super(DepartementRepository, entityManager);
  }
}
