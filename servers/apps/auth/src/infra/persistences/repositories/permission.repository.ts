import { AbstractRepositorymySQL } from '@app/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Permission } from '../entities/permession.entity';
import { CONNECTION } from '@app/shared/tenancy/tenancy.symbols';

@Injectable()
export class PermissionRepositorySQL extends AbstractRepositorymySQL<Permission> {
  protected readonly logger = new Logger(PermissionRepositorySQL.name);

  constructor(
    @InjectRepository(Permission)
    permissionRepository: Repository<Permission>,
    entityManager: EntityManager,
    @Inject(CONNECTION) private readonly dataSource: DataSource,
  ) {
    super(
      dataSource.getRepository(Permission),
      dataSource.createEntityManager(),
    );
  }
}
