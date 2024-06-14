import {
  // AbstractRepository,
  AbstractRepositorymySQL,
  // UserDocument,
} from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepositorySQL extends AbstractRepositorymySQL<Role> {
  protected readonly logger = new Logger(RoleRepositorySQL.name);

  constructor(
    @InjectRepository(Role)
    roleRepository: Repository<Role>,
    entityManager: EntityManager,
  ) {
    super(roleRepository, entityManager);
  }
}
