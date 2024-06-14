import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { EmployeeORG } from '../models/employee.schema';
@Injectable()
export class EmployeeRepositorySQL extends AbstractRepositorymySQL<EmployeeORG> {
  protected readonly logger = new Logger(EmployeeRepositorySQL.name);

  constructor(
    @InjectRepository(EmployeeORG)
    EmployeeRepository: Repository<EmployeeORG>,
    entityManager: EntityManager,
  ) {
    super(EmployeeRepository, entityManager);
  }
}
