import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { DatabaseModulemySQL } from '@app/shared';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { HotelRepositorySQL, RoomRepositorySQL } from './room.repository';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { HotelORG } from '../../models/hotel.schema';
import { RoomORG } from '../../models/rooms.schema';
import { UserRepositorySQLForRoom } from '../users/users.repository';
import { UserRepositoryModule } from '../users/users.module';
import { UserORG } from '../../models/users.mysql.entity';

@Module({
  imports: [
    UserRepositoryModule,
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([RoomORG, HotelORG, UserORG]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    RoomResolver,
    RoomService,
    RoomRepositorySQL,
    UserRepositorySQLForRoom,
    HotelRepositorySQL,
  ],
  exports: [UserRepositorySQLForRoom],
})
export class RoomModule {}
