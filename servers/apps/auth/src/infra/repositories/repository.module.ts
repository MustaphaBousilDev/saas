import { Module } from '@nestjs/common';
import { UserAuth, UserAuth as UserSS } from '../entities/user.entity';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseModulemySQL } from '@app/shared';
import { ConfigModule } from '@nestjs/config';
import { RoleRepositorySQL } from './role.repositoru';
import { Role } from '../entities/role.entity';
import { PermissionRepositorySQL } from './permission.repository';
import { UserDetailsRepositorySQL } from './users-details.repository';
import { UserRepositorySQL } from './users.repository';
import { Permission } from '../entities/permession.entity';
import { UserDetailAuth } from '../entities/user-details.entity';
import { ResourceRepositorySQL } from './resource.repository';
import { Resource } from '../entities/resources.entity';
import { Role_Has_Resource_Permission } from '../entities/role_has_resource_permission';
import { RoleResourcePermissionRepositorySQL } from './role-resource-permission.respository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([
      UserSS,
      Role,
      Permission,
      UserAuth,
      UserDetailAuth,
      Resource,
      Role_Has_Resource_Permission,
    ]),
  ],
  providers: [
    DatabaseUserRepository,
    RoleRepositorySQL,
    PermissionRepositorySQL,
    UserDetailsRepositorySQL,
    UserRepositorySQL,
    ResourceRepositorySQL,
    RoleResourcePermissionRepositorySQL,
  ],
  exports: [
    DatabaseUserRepository,
    RoleRepositorySQL,
    PermissionRepositorySQL,
    UserDetailsRepositorySQL,
    UserRepositorySQL,
    ResourceRepositorySQL,
    RoleResourcePermissionRepositorySQL,
  ],
})
export class RepositoryModule {}
