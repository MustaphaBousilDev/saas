import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserDetailAuth } from '../entities/user-details.entity';
import { UserDetailsRepository } from '@app/domain';

@Injectable()
export class UserDetailsRepositorySQL
  extends AbstractRepositorymySQL<UserDetailAuth>
  //implements UserDetailsRepository
{
  protected readonly logger = new Logger(UserDetailsRepositorySQL.name);

  constructor(
    @InjectRepository(UserDetailAuth)
    userDetailsRepository: Repository<UserDetailAuth>,
    entityManager: EntityManager,
  ) {
    super(userDetailsRepository, entityManager);
  }

  /*async getInfoDetails(id: number) {
    const userDetails = await this.entityRepository.findOne({
      where: {
        _id: id,
      },
    });
    if (!userDetails) {
      return null;
    }
    return userDetails;
  }*/
}
