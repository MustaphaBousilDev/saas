import { Module } from '@nestjs/common';
import { DatabaseModulemySQL } from '@app/shared';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { HotelResolver } from './hotel.resolver';
import { HotelService } from './hotel.service';
import {
  CityRepositorySQL,
  DepartementRepositorySQL,
  HotelRepositorySQL,
  OrganizationRepositorySQL,
} from './hotel.repository';
import { HotelORG } from '../../models/hotel.schema';
import { UserRepositorySQLForRoom } from '../users/users.repository';
import { UserRepositoryModule } from '../users/users.module';
import { CityORG } from '../../models/city.schema';
import { DepartementORG } from '../../models/departement.schema';
import { OrganizationORG } from '../../models/organization.schema';
import { WifiORG } from '../../models/wifi.schema';
import { RoomORG } from '../../models/rooms.schema';
import { UserORG } from '../../models/users.mysql.entity';

@Module({
  imports: [
    UserRepositoryModule,
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([
      HotelORG,
      CityORG,
      DepartementORG,
      OrganizationORG,
      WifiORG,
      RoomORG,
      UserORG,
    ]),
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
    HotelResolver,
    HotelService,
    HotelRepositorySQL,
    UserRepositorySQLForRoom,
    CityRepositorySQL,
    OrganizationRepositorySQL,
    DepartementRepositorySQL,
  ],
})
export class HotelModule {}
