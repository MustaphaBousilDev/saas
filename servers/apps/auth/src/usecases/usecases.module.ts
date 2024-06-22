import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginUseCases } from './auth/login.usecases';
import { RegisterUseCases } from './auth/register.usecases';
import { LogoutUseCases } from './auth/logout.usecases';
import { RateLimiterModule } from '@app/infra/services/rate/rate-limiter.module';
import { BcryptModule } from '@app/infra/services/bcrypt';
import { EnvironmentConfigModule } from '@app/infra/config';
import { RepositoryModule } from '@app/infra/repositories/repository.module';
import { LoggerModule } from '@app/infra/logger';
import { JwtModule } from '@app/infra/services/jwt';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { TenancyModule } from '@app/shared/tenancy/tenancy.module';

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
  exports: [LoginUseCases, RegisterUseCases, LogoutUseCases],
  providers: [
    LoginUseCases,
    RegisterUseCases,
    LogoutUseCases,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class UseCasesModule {}
