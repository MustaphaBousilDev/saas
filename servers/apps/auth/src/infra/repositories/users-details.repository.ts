import { AbstractRepositorymySQL } from '@app/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserDetailAuth } from '../entities/user-details.entity';
import { CONNECTION } from '@app/shared/tenancy/tenancy.symbols';

@Injectable()
export class UserDetailsRepositorySQL extends AbstractRepositorymySQL<UserDetailAuth> {
  protected readonly logger = new Logger(UserDetailsRepositorySQL.name);

  constructor(
    @InjectRepository(UserDetailAuth)
    userDetailsRepository: Repository<UserDetailAuth>,
    entityManager: EntityManager,
    @Inject(CONNECTION) private readonly dataSource: DataSource,
  ) {
    super(
      dataSource.getRepository(UserDetailAuth),
      dataSource.createEntityManager(),
    );
  }
}
