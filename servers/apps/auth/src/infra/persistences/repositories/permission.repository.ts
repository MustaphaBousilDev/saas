import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Permission } from '../entities/permession.entity';

@Injectable()
export class PermissionRepositorySQL extends AbstractRepositorymySQL<Permission> {
  protected readonly logger = new Logger(PermissionRepositorySQL.name);

  constructor(
    @InjectRepository(Permission)
    permissionRepository: Repository<Permission>,
    entityManager: EntityManager,
  ) {
    super(permissionRepository, entityManager);
  }
}
