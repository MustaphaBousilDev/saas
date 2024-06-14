import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { OrganizationORG } from './models/organization.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserORG } from './models/users.mysql.entity';

@Injectable()
export class OrganizationRepositorymySQL extends AbstractRepositorymySQL<OrganizationORG> {
  protected readonly logger = new Logger(OrganizationRepositorymySQL.name);

  constructor(
    @InjectRepository(OrganizationORG)
    ReservationsRepository: Repository<OrganizationORG>,
    entityManager: EntityManager,
  ) {
    super(ReservationsRepository, entityManager);
  }
}

@Injectable()
export class UserRepositorySQLOrg extends AbstractRepositorymySQL<UserORG> {
  protected readonly logger = new Logger(UserRepositorySQLOrg.name);

  constructor(
    @InjectRepository(UserORG)
    UserRepositorymySQL: Repository<UserORG>,
    entityManager: EntityManager,
  ) {
    super(UserRepositorymySQL, entityManager);
  }
}
