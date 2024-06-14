import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { EmployeeEMP } from './models/employee.schema';
import { DepartementEMP } from './models/departement.schema';
import { UserEMP } from './models/users.schema';
import { PositionEMP } from './models/position.schema';
import { TimeWorkEMP } from './models/time-work.schema';

@Injectable()
export class EmployeeRepositorymySQL extends AbstractRepositorymySQL<EmployeeEMP> {
  protected readonly logger = new Logger(EmployeeRepositorymySQL.name);

  constructor(
    @InjectRepository(EmployeeEMP)
    EmployeeRepository: Repository<EmployeeEMP>,
    entityManager: EntityManager,
  ) {
    super(EmployeeRepository, entityManager);
  }
}

@Injectable()
export class DepartementRepositorymySQL extends AbstractRepositorymySQL<DepartementEMP> {
  protected readonly logger = new Logger(DepartementRepositorymySQL.name);

  constructor(
    @InjectRepository(DepartementEMP)
    DepartementRepository: Repository<DepartementEMP>,
    entityManager: EntityManager,
  ) {
    super(DepartementRepository, entityManager);
  }
}

@Injectable()
export class UserRepositorymySQL extends AbstractRepositorymySQL<UserEMP> {
  protected readonly logger = new Logger(UserRepositorymySQL.name);

  constructor(
    @InjectRepository(UserEMP)
    UserRepository: Repository<UserEMP>,
    entityManager: EntityManager,
  ) {
    super(UserRepository, entityManager);
  }
}

@Injectable()
export class PositionRepositorymySQL extends AbstractRepositorymySQL<PositionEMP> {
  protected readonly logger = new Logger(PositionRepositorymySQL.name);

  constructor(
    @InjectRepository(PositionEMP)
    PositionRepository: Repository<PositionEMP>,
    entityManager: EntityManager,
  ) {
    super(PositionRepository, entityManager);
  }
}

@Injectable()
export class timeWorkRepositorymySQL extends AbstractRepositorymySQL<TimeWorkEMP> {
  protected readonly logger = new Logger(timeWorkRepositorymySQL.name);

  constructor(
    @InjectRepository(TimeWorkEMP)
    timeWorkRepository: Repository<TimeWorkEMP>,
    entityManager: EntityManager,
  ) {
    super(timeWorkRepository, entityManager);
  }
}
