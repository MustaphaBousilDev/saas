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
import { ResourceRolePermessionRepositorySQL } from './resources-role-permission.repository';
import {
  AccountLockOut,
  FailedLoginAttempts,
  LoginAttempts,
  PasswordHistory,
  PasswordPolicy,
  PasswordResetToken,
  Policies,
  Tenant,
} from '../entities';
import { TenancyModule } from '@app/shared/tenancy/tenancy.module';
import { PolicyRepositorySQL } from './policy.repository';
import { TenantRepositorySQL } from './tenant.repository';

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
      Tenant,
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
    ResourceRolePermessionRepositorySQL,
    PolicyRepositorySQL,
    TenantRepositorySQL,
    //LocalStrategy,
  ],
  exports: [
    UserDetailsRepositorySQL,
    UserRepositorySQL,
    DatabaseUserRepository,
    RoleRepositorySQL,
    PermissionRepositorySQL,
    ResourceRepositorySQL,
    ResourceRolePermessionRepositorySQL,
    PolicyRepositorySQL,
    TenantRepositorySQL,
  ],
})
export class RepositoryModule {}
