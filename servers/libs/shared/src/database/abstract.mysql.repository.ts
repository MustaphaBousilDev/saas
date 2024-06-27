import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity.mysql';
import {
  EntityManager,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepositorymySQL<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly entityRepository: Repository<T>,
    protected readonly entityManager: EntityManager,
  ) {}

  public ORM = 'typeORM';

  //Omit is an utility typescript for create a new type and in this situation the new type is all propertyType to TDOcument except '_id' <-this is new Type is for document parzmetre
  async create(entity: T): Promise<T> {
    const savedEntity = await this.entityManager.save(entity);
    return savedEntity;
  }

  async findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    const entity = await this.entityRepository.findOne({ where, relations });
    if (!entity) {
      this.logger.warn('Document was not found with filterQuery', where);
      throw new NotFoundException('Entity was not found');
    } else {
      this.logger.debug('Entity Found:', entity);
    }
    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    const updateResult = await this.entityRepository.update(
      where,
      partialEntity,
    );
    if (!updateResult.affected) {
      this.logger.warn('Entity not found with where', where);
      throw new NotFoundException('Entity not found.');
    }
    return true;
  }

  async find(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
    skip?: number,
    take?: number,
  ): Promise<T[]> {
    return this.entityRepository.find({
      where,
      relations,
      skip,
      take,
    });
  }

  async findOneAndDelete(where: FindOptionsWhere<T>) {
    return this.entityRepository.delete(where);
  }

  async findMany(options?: FindManyOptions<T>): Promise<T[]> {
    return this.entityRepository.find(options);
  }
}
