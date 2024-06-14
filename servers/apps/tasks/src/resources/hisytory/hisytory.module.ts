import { Module } from '@nestjs/common';
import { HisytoryService } from './hisytory.service';
import { HisytoryResolver } from './hisytory.resolver';
import { DatabaseModulemySQL } from '@app/shared';
import { Task_HistoryTASKS } from '../../models/task-history.entity';
import { TasksTASKS } from '../../models/tasks.entity';
import { EmployeeTASKS } from '../../models/employee.entity';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import {
  EmployeeRepositorymySQL,
  TaskHistoryRepositorymySQL,
  TasksRepositorymySQL,
} from './history.repository';

@Module({
  imports: [
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([
      Task_HistoryTASKS,
      TasksTASKS,
      EmployeeTASKS,
    ]),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloFederationDriver,
    //   autoSchemaFile: {
    //     federation: 2,
    //   },
    // }),
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    HisytoryResolver,
    HisytoryService,
    TasksRepositorymySQL,
    TaskHistoryRepositorymySQL,
    EmployeeRepositorymySQL,
  ],
})
export class HisytoryModule {}
