import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { HotelORG } from '../../models/hotel.schema';
import { OrganizationORG } from '../../models/organization.schema';
import { CityORG } from '../../models/city.schema';
import { UserORG } from '../../models/users.mysql.entity';
import { DepartementORG } from '../../models/departement.schema';

@Injectable()
export class HotelRepositorySQL extends AbstractRepositorymySQL<HotelORG> {
  protected readonly logger = new Logger(HotelRepositorySQL.name);

  constructor(
    @InjectRepository(HotelORG)
    HotelRepository: Repository<HotelORG>,
    entityManager: EntityManager,
  ) {
    super(HotelRepository, entityManager);
  }
}

@Injectable()
export class OrganizationRepositorySQL extends AbstractRepositorymySQL<OrganizationORG> {
  protected readonly logger = new Logger(OrganizationRepositorySQL.name);

  constructor(
    @InjectRepository(OrganizationORG)
    OrganizationRepository: Repository<OrganizationORG>,
    entityManager: EntityManager,
  ) {
    super(OrganizationRepository, entityManager);
  }
}

@Injectable()
export class CityRepositorySQL extends AbstractRepositorymySQL<CityORG> {
  protected readonly logger = new Logger(CityRepositorySQL.name);

  constructor(
    @InjectRepository(CityORG)
    CityRepository: Repository<CityORG>,
    entityManager: EntityManager,
  ) {
    super(CityRepository, entityManager);
  }
}

@Injectable()
export class UserRepositorySQL extends AbstractRepositorymySQL<UserORG> {
  protected readonly logger = new Logger(UserRepositorySQL.name);

  constructor(
    @InjectRepository(UserORG)
    UserRepository: Repository<UserORG>,
    entityManager: EntityManager,
  ) {
    super(UserRepository, entityManager);
  }
}

@Injectable()
export class DepartementRepositorySQL extends AbstractRepositorymySQL<DepartementORG> {
  protected readonly logger = new Logger(UserRepositorySQL.name);

  constructor(
    @InjectRepository(DepartementORG)
    DepartementRepository: Repository<DepartementORG>,
    entityManager: EntityManager,
  ) {
    super(DepartementRepository, entityManager);
  }
}
