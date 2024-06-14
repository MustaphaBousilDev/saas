import { Module } from '@nestjs/common';
import { TimeworksService } from './timeworks.service';
import { TimeworksResolver } from './timeworks.resolver';
import { DatabaseModulemySQL, LoggerModule } from '@app/shared';
import { UserEMP } from '../models/users.schema';
import { TimeWorkEMP } from '../models/time-work.schema';
import { EmployeeEMP } from '../models/employee.schema';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import {
  TimeWorkRepositorymySQL,
  UserRepositorymySQL,
} from './timeworks.repository';

@Module({
  imports: [
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([UserEMP, TimeWorkEMP, EmployeeEMP]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    TimeworksResolver,
    TimeworksService,
    UserRepositorymySQL,
    TimeWorkRepositorymySQL,
  ],
})
export class TimeworksModule {}
