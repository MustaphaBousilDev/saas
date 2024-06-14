import {
  // AbstractRepository,
  AbstractRepositorymySQL,
  // UserDocument,
} from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
// import { Model } from 'mongoose';
import { EntityManager, Repository } from 'typeorm';
import { UserTASKS } from '../models/users.repository';

// @Injectable()
// export class UsersRepository extends AbstractRepository<UserDocument> {
//   protected readonly logger = new Logger(UsersRepository.name);

//   constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
//     super(userModel);
//   }
// }

@Injectable()
export class UserRepositorySQL extends AbstractRepositorymySQL<UserTASKS> {
  protected readonly logger = new Logger(UserRepositorySQL.name);

  constructor(
    @InjectRepository(UserTASKS)
    usersRepository: Repository<UserTASKS>,
    entityManager: EntityManager,
  ) {
    super(usersRepository, entityManager);
  }
}
