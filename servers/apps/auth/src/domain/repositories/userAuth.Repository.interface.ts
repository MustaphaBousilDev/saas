import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
} from 'typeorm';
import { UserAuth } from '../../infra/persistences/entities/user.entity';
import { UserDOMAIN } from '../model/user';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface UserAuthRepository {
  getUserByUsername(username: string): Promise<UserDOMAIN>;
  getUserByEmail(email: string): Promise<UserDOMAIN>;
  create(entity: UserAuth): Promise<UserAuth>;
  findOne(
    where: FindOptionsWhere<UserAuth>,
    relations?: FindOptionsRelations<UserAuth>,
  ): Promise<UserAuth>;
  findOneAndUpdate(
    where: FindOptionsWhere<UserAuth>,
    partialEntity: QueryDeepPartialEntity<UserAuth>,
  ): Promise<UserAuth>;
  find(where: FindOptionsWhere<UserAuth>);
  findOneAndDelete(where: FindOptionsWhere<UserAuth>);
  findMany(options?: FindManyOptions<UserAuth>): Promise<UserAuth[]>;
  insertMany(entities: UserAuth[]): Promise<UserAuth[]>;
  //updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
}
