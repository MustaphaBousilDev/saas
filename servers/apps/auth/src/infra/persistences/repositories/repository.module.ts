import { Module } from '@nestjs/common';
import { UserAuth, UserAuth as UserSS } from '../entities/user.entity';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseModulemySQL } from '@app/shared';
import { ConfigModule } from '@nestjs/config';
import { RoleRepositorySQL } from './role.repository';
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
import {
  AccountLockOut,
  FailedLoginAttempts,
  LoginAttempts,
  PasswordHistory,
  PasswordPolicy,
  PasswordResetToken,
  Policies,
} from '../entities';
import { TenancyModule } from '@app/shared/tenancy/tenancy.module';

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
      FailedLoginAttempts,
      PasswordHistory,
      PasswordResetToken,
      UserDetailAuth,
      LoginAttempts,
      Policies,
      Resource,
      PasswordPolicy,
      Role_Has_Resource_Permission,
      AccountLockOut,
    ]),
    TenancyModule,
  ],
  providers: [
    DatabaseUserRepository,
    UserDetailsRepositorySQL,
    UserRepositorySQL,
    RoleRepositorySQL,
    PermissionRepositorySQL,
    ResourceRepositorySQL,
    RoleResourcePermissionRepositorySQL,
    //LocalStrategy,
  ],
  exports: [
    UserDetailsRepositorySQL,
    UserRepositorySQL,
    DatabaseUserRepository,
    RoleRepositorySQL,
    PermissionRepositorySQL,
    ResourceRepositorySQL,
    RoleResourcePermissionRepositorySQL,
  ],
})
export class RepositoryModule {}
