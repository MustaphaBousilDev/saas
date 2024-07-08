import { AbstractRepositorymySQL } from '@app/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Resource } from '../entities/resources.entity';
import { CONNECTION } from '@app/shared/tenancy/tenancy.symbols';

@Injectable()
export class ResourceRepositorySQL extends AbstractRepositorymySQL<Resource> {
  protected readonly logger = new Logger(ResourceRepositorySQL.name);

  constructor(@Inject(CONNECTION) private readonly dataSource: DataSource) {
    super(dataSource.getRepository(Resource), dataSource.createEntityManager());
  }
}
