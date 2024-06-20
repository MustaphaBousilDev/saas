import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantRepositorySQL extends AbstractRepositorymySQL<Tenant> {
  protected readonly logger = new Logger(TenantRepositorySQL.name);

  constructor(
    @InjectRepository(Tenant)
    tenantRepository: Repository<Tenant>,
    entityManager: EntityManager,
  ) {
    super(tenantRepository, entityManager);
  }
}
