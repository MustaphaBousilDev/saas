import {
  // AbstractRepository,
  AbstractRepositorymySQL,
  // UserDocument,
} from '@app/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { CONNECTION } from '@app/shared/tenancy/tenancy.symbols';

@Injectable()
export class RoleRepositorySQL extends AbstractRepositorymySQL<Role> {
  protected readonly logger = new Logger(RoleRepositorySQL.name);

  constructor(
    @InjectRepository(Role)
    roleRepository: Repository<Role>,
    entityManager: EntityManager,
    @Inject(CONNECTION) private readonly dataSource: DataSource,
  ) {
    //super(roleRepository, entityManager);
    super(dataSource.getRepository(Role), dataSource.createEntityManager());
  }
}
