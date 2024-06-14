import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsResolver } from './positions.resolver';
import { DatabaseModulemySQL, LoggerModule } from '@app/shared';
import { UserEMP } from '../models/users.schema';
import { PositionEMP } from '../models/position.schema';
import { EmployeeEMP } from '../models/employee.schema';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import {
  PositionRepositorymySQL,
  UserRepositorymySQL,
} from './positions.repository';

@Module({
  imports: [
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([UserEMP, PositionEMP, EmployeeEMP]),
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
    PositionsResolver,
    PositionsService,
    UserRepositorymySQL,
    PositionRepositorymySQL,
  ],
})
export class PositionsModule {}
