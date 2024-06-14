import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
} from 'typeorm';
import { UserDetailAuth } from '@app/auth-entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface UserDetailsRepository {
  getInfoDetails(id: number): Promise<UserDetailAuth>;
  create(entity: UserDetailAuth): Promise<UserDetailAuth>;
  findOne(
    where: FindOptionsWhere<UserDetailAuth>,
    relations?: FindOptionsRelations<UserDetailAuth>,
  ): Promise<UserDetailAuth>;
  findOneAndUpdate(
    where: FindOptionsWhere<UserDetailAuth>,
    partialEntity: QueryDeepPartialEntity<UserDetailAuth>,
  ): Promise<UserDetailAuth>;
  find(where: FindOptionsWhere<UserDetailAuth>);
  findOneAndDelete(where: FindOptionsWhere<UserDetailAuth>);
  findMany(
    options?: FindManyOptions<UserDetailAuth>,
  ): Promise<UserDetailAuth[]>;
  insertMany(entities: UserDetailAuth[]): Promise<UserDetailAuth[]>;
}
