import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Role_Has_Resource_Permission } from '../entities/role_has_resource_permission';

@Injectable()
export class RoleResourcePermissionRepositorySQL extends AbstractRepositorymySQL<Role_Has_Resource_Permission> {
  protected readonly logger = new Logger(
    RoleResourcePermissionRepositorySQL.name,
  );

  constructor(
    @InjectRepository(Role_Has_Resource_Permission)
    roleResourcePermissionRepository: Repository<Role_Has_Resource_Permission>,
    entityManager: EntityManager,
  ) {
    super(roleResourcePermissionRepository, entityManager);
  }
}
