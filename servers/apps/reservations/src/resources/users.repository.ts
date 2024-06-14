import { AbstractRepositorymySQL } from '@app/shared';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserRES } from '../models/users.mysql.entity';

// @Injectable()
// export class UsersRepository extends AbstractRepository<UserDocument> {
//   protected readonly logger = new Logger(UsersRepository.name);

//   constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
//     super(userModel);
//   }
// }

export class UserRepositorySQL extends AbstractRepositorymySQL<UserRES> {
  protected readonly logger = new Logger(UserRepositorySQL.name);

  constructor(
    @InjectRepository(UserRES)
    usersRepository: Repository<UserRES>,
    entityManager: EntityManager,
  ) {
    super(usersRepository, entityManager);
  }
}
