import { Module } from '@nestjs/common';
import { TaskstypesService } from './taskstypes.service';
import { TaskstypesResolver } from './taskstypes.resolver';
import { DatabaseModulemySQL } from '@app/shared';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { TasksTASKS } from '../../models/tasks.entity';
import { TasksTypeTASKS } from '../../models/tasks-type.entity';
import { DepartementTASKS } from '../../models/departement.entity';
import {
  DepartementRepositorymySQL,
  TasksTypeRepositorymySQL,
} from './tasksTypes.repository';
@Module({
  imports: [
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([
      TasksTASKS,
      TasksTypeTASKS,
      DepartementTASKS,
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
    TaskstypesResolver,
    TaskstypesService,
    TasksTypeRepositorymySQL,
    DepartementRepositorymySQL,
  ],
})
export class TaskstypesModule {}
