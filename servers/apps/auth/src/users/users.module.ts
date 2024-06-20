import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
//import { UserRepositorySQL } from './users.repository';
import {
  DatabaseModulemySQL,
  EMPLOYEE_SERVICE,
  ORGANIZATION_SERVICE,
  RESERVATION_SERVICE,
  STOCK_SERVICE,
  TASKS_SERVICE,
  User,
} from '@app/shared';
import { LoggerModule } from 'nestjs-pino';
import { UsersResolver } from './users.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import {
  AccountLockOut,
  FailedLoginAttempts,
  LoginAttempts,
  PasswordHistory,
  PasswordPolicy,
  PasswordResetToken,
  Permission,
  Policies,
  Resource,
  Role,
  Role_Has_Resource_Permission,
  UserAuth,
  UserDetailAuth,
  VerificationEmailLogs,
} from '@app/infra/entities';

@Module({
  imports: [
    // DatabaseModule,
    //DatabaseModule.forFeature in databaseModel inside shared folder
    // DatabaseModule.forFeature([
    //   {
    //     name: UserDocument.name,
    //     schema: UserSchema,
    //   },
    // ]),
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([
      UserAuth,
      AccountLockOut,
      VerificationEmailLogs,
      LoginAttempts,
      PasswordHistory,
      PasswordPolicy,
      PasswordResetToken,
      Permission,
      Policies,
      Role,
      UserDetailAuth,
      FailedLoginAttempts,
      Resource,
      Role_Has_Resource_Permission,
    ]),
    LoggerModule,
    /*ClientsModule.registerAsync([
      {
        name: ORGANIZATION_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'organization',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: RESERVATION_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'reservations',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: TASKS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'tasks',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: EMPLOYEE_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'employee',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: STOCK_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'stock',
          },
        }),
        inject: [ConfigService],
      },
    ]),*/
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UsersModule {}
