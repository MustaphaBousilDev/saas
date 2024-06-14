import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepositorySQL } from './users.repository';
import {
  DatabaseModulemySQL,
  EMPLOYEE_SERVICE,
  ORGANIZATION_SERVICE,
  RESERVATION_SERVICE,
  Role,
  STOCK_SERVICE,
  TASKS_SERVICE,
  User,
} from '@app/shared';
import { LoggerModule } from 'nestjs-pino';
import { UsersResolver } from './users.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

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
    DatabaseModulemySQL.forFeature([User, Role]),
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
  controllers: [UsersController],
  providers: [UsersService, UserRepositorySQL, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
