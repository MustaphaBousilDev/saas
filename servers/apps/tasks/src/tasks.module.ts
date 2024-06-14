import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, DatabaseModulemySQL, LoggerModule } from '@app/shared';
import { TasksTASKS } from './models/tasks.entity';
import { TasksTypeTASKS } from './models/tasks-type.entity';
import { TasksResolver } from './tasks.resolver';
import {
  EmployeeRepositorymySQL,
  TaskAttachementRepositorymySQL,
  TasksRepositorymySQL,
  TasksTypeRepositorymySQL,
} from './tasks.repository';
import { EmployeeTASKS } from './models/employee.entity';
import { OrganizationTASKS } from './models/organization.entity';
import { HotelTASKS } from './models/hotel.entity';
import { Task_HistoryTASKS } from './models/task-history.entity';
import { TasksAttachTASKS } from './models/tasks-attachement.entity';
import { DepartementTASKS } from './models/departement.entity';
import { TaskstypesModule } from './resources/taskstypes/taskstypes.module';
import { AttachementModule } from './resources/attachement/attachement.module';
import { HisytoryModule } from './resources/hisytory/hisytory.module';
import { UserRepositorySQL } from './resources/users.repository';
import { UserTASKS } from './models/users.repository';

@Module({
  imports: [
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([
      TasksTASKS,
      TasksTypeTASKS,
      EmployeeTASKS,
      OrganizationTASKS,
      HotelTASKS,
      Task_HistoryTASKS,
      TasksAttachTASKS,
      DepartementTASKS,
      UserTASKS,
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    LoggerModule,
    TaskstypesModule,
    AttachementModule,
    HisytoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'auth',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    TasksResolver,
    TasksRepositorymySQL,
    TasksTypeRepositorymySQL,
    TaskAttachementRepositorymySQL,
    EmployeeRepositorymySQL,
    UserRepositorySQL,
  ],
})
export class TasksModule {}
