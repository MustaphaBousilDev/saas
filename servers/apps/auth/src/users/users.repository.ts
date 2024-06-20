import { UserAuth } from '@app/infra/entities';
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
import { User } from '@app/shared';

// @Injectable()
// export class UsersRepository extends AbstractRepository<UserDocument> {
//   protected readonly logger = new Logger(UsersRepository.name);

//   constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
//     super(userModel);
//   }
// }

@Injectable()
export class UserRepositorySQL extends AbstractRepositorymySQL<User> {
  protected readonly logger = new Logger(UserRepositorySQL.name);

  constructor(
    @InjectRepository(User)
    usersRepository: Repository<User>,
    entityManager: EntityManager,
  ) {
    super(usersRepository, entityManager);
  }
}
