import { AbstractRepositorymySQL } from '@app/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CONNECTION } from '@app/shared/tenancy/tenancy.symbols';
import { Policies } from '../entities';

@Injectable()
export class PolicyRepositorySQL extends AbstractRepositorymySQL<Policies> {
  protected readonly logger = new Logger(PolicyRepositorySQL.name);

  constructor(
    @InjectRepository(Policies)
    polocyRepository: Repository<Policies>,
    entityManager: EntityManager,
    @Inject(CONNECTION) private readonly dataSource: DataSource,
  ) {
    //super(roleRepository, entityManager);
    super(dataSource.getRepository(Policies), dataSource.createEntityManager());
  }
}
