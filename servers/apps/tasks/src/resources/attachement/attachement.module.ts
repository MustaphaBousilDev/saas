import { Module } from '@nestjs/common';
import { AttachementService } from './attachement.service';
import { AttachementResolver } from './attachement.resolver';
import { DatabaseModulemySQL } from '@app/shared';
import { TasksAttachTASKS } from '../../models/tasks-attachement.entity';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import {
  EmployeeRepositorymySQL,
  TasksAttachementRepositorymySQL,
} from './attachement.repository';
import { EmployeeTASKS } from '../../models/employee.entity';
import { TasksTASKS } from '../../models/tasks.entity';

@Module({
  imports: [
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([
      TasksAttachTASKS,
      EmployeeTASKS,
      TasksTASKS,
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
    AttachementResolver,
    AttachementService,
    TasksAttachementRepositorymySQL,
    EmployeeRepositorymySQL,
  ],
})
export class AttachementModule {}
