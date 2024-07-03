import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginUseCases } from './auth/login.usecases';
import { RegisterUseCases } from './auth/register.usecases';
import { LogoutUseCases } from './auth/logout.usecases';
import { RateLimiterModule } from '@app/infra/services/rate/rate-limiter.module';
import { BcryptModule } from '@app/infra/services/bcrypt';
import { EnvironmentConfigModule } from '@app/infra/config';
import { RepositoryModule } from '@app/infra/persistences';
import { LoggerModule } from '@app/infra/logger';
import { JwtModule } from '@app/infra/services/jwt';
import { TenancyModule } from '@app/shared/tenancy/tenancy.module';
import {
  RoleAllUseCases,
  RoleCreateUseCases,
  RoleDeleteUseCases,
  RoleGetUseCases,
  RolePatchUseCases,
  RoleUpdateUseCases,
} from './role';

@Module({
  imports: [
    TenancyModule,
    JwtModule,
    RateLimiterModule,
    BcryptModule,
    LoggerModule,
    EnvironmentConfigModule,
    RepositoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  exports: [
    //auth
    LoginUseCases,
    RegisterUseCases,
    LogoutUseCases,
    //role
    RoleAllUseCases,
    RoleCreateUseCases,
    RoleDeleteUseCases,
    RoleGetUseCases,
    RoleUpdateUseCases,
    RolePatchUseCases,
  ],
  providers: [
    //auth
    LoginUseCases,
    RegisterUseCases,
    LogoutUseCases,
    //role
    RoleAllUseCases,
    RoleCreateUseCases,
    RoleDeleteUseCases,
    RoleGetUseCases,
    RoleUpdateUseCases,
    RolePatchUseCases,
  ],
})
export class UseCasesModule {}
