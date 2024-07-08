import { AbstractRepositorymySQL } from '@app/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role_Has_Resource_Permission } from '../entities';
import { CONNECTION } from '@app/shared/tenancy/tenancy.symbols';

@Injectable()
export class ResourceRolePermessionRepositorySQL extends AbstractRepositorymySQL<Role_Has_Resource_Permission> {
  protected readonly logger = new Logger(
    ResourceRolePermessionRepositorySQL.name,
  );

  constructor(
    @Inject(CONNECTION)
    private readonly dataSource: DataSource,
  ) {
    super(
      dataSource.getRepository(Role_Has_Resource_Permission),
      dataSource.createEntityManager(),
    );
  }
}
