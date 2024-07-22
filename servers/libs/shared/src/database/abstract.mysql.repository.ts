import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AbstractEntity } from './abstract.entity.mysql';
import {
  DeleteResult,
  EntityManager,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
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
    try {
      const savedEntity = await this.entityManager.save(entity);
      return savedEntity;
    } catch (error) {
      this.logger.error('Error creating entity', error);
      throw new InternalServerErrorException('Error creating entity');
    }
  }

  async findOne(
    where: FindOptionsWhere<T>,
    relations: FindOptionsRelations<T> = null,
  ): Promise<T> {
    try {
      const entity = await this.entityRepository.findOne({ where, relations });
      if (!entity) {
        this.logger.warn(
          'Document was not found with filterQuery',
          JSON.stringify(where),
        );
        return null;
      }
      this.logger.debug('Entity Found:', entity);
      return entity;
    } catch (error) {
      this.logger.error('Error finding entity', error);
      throw new InternalServerErrorException('Error finding entity');
    }
  }

  async findOneQueryBuilder(
    where: FindOptionsWhere<T>,
    relations: FindOptionsRelations<T> = null,
    select: (keyof T)[] = null,
  ): Promise<T> {
    try {
      let queryBuilder: SelectQueryBuilder<T> =
        this.entityRepository.createQueryBuilder('entity');
      if (select) {
        queryBuilder = queryBuilder.select(
          select.map((field) => `entity.${String(field)}`),
        );
      }
      queryBuilder = queryBuilder.where(where);
      if (relations) {
        for (const relation of Object.keys(relations)) {
          queryBuilder = queryBuilder.leftJoinAndSelect(
            `entity.${relation}`,
            relation,
          );
        }
      }
      const entity = await queryBuilder.getOne();
      if (!entity) {
        this.logger.warn(
          'Document was not found with filterQuery',
          JSON.stringify(where),
        );
        return null;
      }
      this.logger.debug('Entity Found', entity);
      return entity;
    } catch (error) {
      this.logger.error('Error finding entity', error);
      throw new InternalServerErrorException('Error finding entity');
    }
  }
  async findManyByUserIdsQueryBuilder(
    userIds: number[],
    relations: FindOptionsRelations<T> = null,
    select: (keyof T)[] = null,
  ): Promise<T[]> {
    try {
      let queryBuilder: SelectQueryBuilder<T> =
        this.entityRepository.createQueryBuilder('entity');

      if (select) {
        queryBuilder = queryBuilder.select(
          select.map((field) => `entity.${String(field)}`),
        );
      }

      queryBuilder = queryBuilder.where(
        'entity.userCreated_id IN (:...userIds)',
        {
          userIds,
        },
      );

      if (relations) {
        for (const relation of Object.keys(relations)) {
          queryBuilder = queryBuilder.leftJoinAndSelect(
            `entity.${relation}`,
            relation,
          );
        }
      }

      const entities = await queryBuilder.getMany();

      if (!entities.length) {
        this.logger.warn(
          'No documents found with userIds',
          JSON.stringify(userIds),
        );
        return [];
      }

      this.logger.debug('Entities Found', entities);
      return entities;
    } catch (error) {
      this.logger.error(`Error finding entities: ${error}`, error);
      throw new InternalServerErrorException('Error finding entities');
    }
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    try {
      const updateResult = await this.entityRepository.update(
        where,
        partialEntity,
      );
      if (!updateResult.affected) {
        this.logger.warn('Entity not found with where', where);
        throw new NotFoundException('Entity not found');
      }
      return true;
    } catch (error) {
      this.logger.error('Error updating entity', error);
      throw new InternalServerErrorException('Error updating entity');
    }
  }

  async find(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
    skip?: number,
    take?: number,
  ): Promise<T[]> {
    try {
      const find = await this.entityRepository.find({
        where,
        relations,
        skip,
        take,
      });
      console.log('find:', find);
      if (find.length === 0) {
        return null;
      }
      return find;
    } catch (error) {
      this.logger.error('Error finding entities', error);
      if (error instanceof NotFoundException) {
        return [];
      } else {
        throw new InternalServerErrorException('Error finding entities');
      }
    }
  }

  async findOneAndDelete(where: FindOptionsWhere<T>): Promise<DeleteResult> {
    try {
      const result = await this.entityRepository.delete(where);
      if (result.affected === 0) {
        this.logger.warn('Entity not found with where', where);
        throw new NotFoundException('Record not found'); // Return an appropriate error
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(error.message);
        throw new NotFoundException('Record not found'); // Return an appropriate error
      } else {
        this.logger.error('An unexpected error occurred:', error);
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }

  async findMany(options?: FindManyOptions<T>): Promise<T[]> {
    return this.entityRepository.find(options);
  }

  // Create multiple entities
  async createMany(entities: T[]): Promise<T[]> {
    try {
      const savedEntities = await this.entityManager.save(entities);
      return savedEntities;
    } catch (error) {
      this.logger.error('Error creating entities', error);
      throw new InternalServerErrorException('Error creating entities');
    }
  }
}
