import { Module } from '@nestjs/common';
import { WifiService } from './wifi.service';
import { WifiResolver } from './wifi.resolver';
import { DatabaseModulemySQL } from '@app/shared';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { HotelRepositorySQL, WifiRepositorySQL } from './wifi.repository';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { WifiORG } from '../../models/wifi.schema';
import { HotelORG } from '../../models/hotel.schema';
import { UserORG } from '../../models/users.mysql.entity';
import { RoomORG } from '../../models/rooms.schema';
import { UserRepositorySQLForRoom } from '../users/users.repository';
import { UserRepositoryModule } from '../users/users.module';

@Module({
  imports: [
    UserRepositoryModule,
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([WifiORG, HotelORG, UserORG, RoomORG]),
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
    WifiResolver,
    WifiService,
    WifiRepositorySQL,
    UserRepositorySQLForRoom,
    HotelRepositorySQL,
  ],
})
export class WifiModule {}
