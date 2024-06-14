import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Resource } from '../entities/resources.entity';

@Injectable()
export class ResourceRepositorySQL extends AbstractRepositorymySQL<Resource> {
  protected readonly logger = new Logger(ResourceRepositorySQL.name);

  constructor(
    @InjectRepository(Resource)
    resourceRepository: Repository<Resource>,
    entityManager: EntityManager,
  ) {
    super(resourceRepository, entityManager);
  }
}
