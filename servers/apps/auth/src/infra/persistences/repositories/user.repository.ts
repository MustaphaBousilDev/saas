import { InjectRepository } from '@nestjs/typeorm';
//import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { Injectable } from '@nestjs/common';
import { UserAuth } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserM } from '@app/domain';

@Injectable()
export class DatabaseUserRepository {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userEntityRepository: Repository<UserAuth>,
  ) {}

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.userEntityRepository.update(
      {
        _id: userId,
      },
      {},
    );
  }
  async getUserByUsername(userId: number): Promise<UserM> {
    const adminUserEntity = await this.userEntityRepository.findOne({
      where: {
        _id: userId,
      },
    });
    if (!adminUserEntity) {
      return null;
    }
    return this.toUser(adminUserEntity);
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.userEntityRepository.update(
      {
        _id: userId,
      },
      {},
    );
  }

  private toUser(adminUserEntity: UserAuth): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = adminUserEntity._id;
    adminUser.email = adminUserEntity.email;
    adminUser.password = adminUserEntity.password;
    //adminUser.createDate = adminUserEntity.;
    //adminUser.updatedDate = adminUserEntity.updateddate;
    //adminUser.lastLogin = adminUserEntity.last_login;
    //adminUser.hashRefreshToken = adminUserEntity.hach_refresh_token;

    return adminUser;
  }
}
