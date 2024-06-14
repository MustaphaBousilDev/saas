import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  AUTH_SERVICE,
  DatabaseModulemySQL,
  LoggerModule,
  ORGANIZATION_SERVICE,
  STOCK_SERVICE,
  TASKS_SERVICE,
} from '@app/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEMP } from './models/users.schema';
import { HotelEMP } from './models/hotel.schema';
import { OrganizationEMP } from './models/organization.schema';
import { DepartementEMP } from './models/departement.schema';
import { EmployeeEMP } from './models/employee.schema';
import { PositionEMP } from './models/position.schema';
import { TimeWorkEMP } from './models/time-work.schema';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { PositionsModule } from './positions/positions.module';
import { TimeworksModule } from './timeworks/timeworks.module';
import {
  DepartementRepositorymySQL,
  EmployeeRepositorymySQL,
  PositionRepositorymySQL,
  UserRepositorymySQL,
  timeWorkRepositorymySQL,
} from './employee.repository';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeController } from './employee.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([
      UserEMP,
      HotelEMP,
      OrganizationEMP,
      DepartementEMP,
      EmployeeEMP,
      PositionEMP,
      TimeWorkEMP,
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PositionsModule,
    TimeworksModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            //actual name of the queu that were going to be using in this service
            queue: 'auth',
          },
        }),
        inject: [ConfigService],
      },
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
    ]),
  ],
  controllers: [EmployeeController],
  providers: [
    EmployeeResolver,
    EmployeeService,
    EmployeeRepositorymySQL,
    DepartementRepositorymySQL,
    UserRepositorymySQL,
    PositionRepositorymySQL,
    timeWorkRepositorymySQL,
  ],
})
export class EmployeeModule {}
