import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthControllers } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { DatabaseModulemySQL, LoggerModule } from '@app/shared';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { ControllerModule } from './infra/controllers';
import { UseCasesModule } from './usecases/usecases.module';
import { TenantsModule } from '@app/shared/tenancy/tenant/tenant.module';
import { TenancyModule } from '@app/shared/tenancy/tenancy.module';
import { AuthMiddleware } from './infra/middlewares/login.middleware';
import { JwtTokenService } from './infra/services/jwt/jwt.service';
import { RepositoryModule } from './infra/persistences';
import { BcryptModule } from './infra/services/bcrypt';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateRoleCommandHandler } from './usecases/role/CQRS/commands/handlers';
@Module({
  //JwtModule.registerAsync for configuration JWT
  imports: [
    DatabaseModulemySQL,
    TenantsModule,
    RepositoryModule,
    TenancyModule,
    ControllerModule,
    UsersModule,
    UseCasesModule,
    BcryptModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        HTTP_PORT_AUTH: Joi.number().required(),
        TCP_PORT_AUTH: Joi.number().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthControllers],
  providers: [AuthService, JwtTokenService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'api/v1/auth/login', method: RequestMethod.POST });
  }
}
