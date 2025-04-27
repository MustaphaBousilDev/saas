import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
//import { ReservationsController } from './reservations.controller';
import {
  LoggerModule,
  AUTH_SERVICE,
  PAYMENT_SERVICE,
  DatabaseModulemySQL,
  ORGANIZATION_SERVICE,
} from '@app/shared';
import {
  HotelRepositorySQL,
  ReservationsRepositorymySQL,
  RoomRepositorySQL,
} from './reservations.repository';
//for mysql typeorm
import { ReservationRES } from './models/reservation.mysql.entity';
import { UserRES } from './models/users.mysql.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { ReservationsResolver } from './reservations.resolver';
import { RoomRES } from './models/rooms.mysql.entity';
import { HotelRES } from './models/hotel.mysql.entity';
import { OrganizationRES } from './models/organization.mysql.entity';
import { UserRepositorySQL } from './reservations.repository';
import { ReservationsController } from './reservations.controller';
import { UserRepositorySQL as UserRemoteRepository } from './resources/users.repository';
@Module({
  imports: [
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([
      ReservationRES,
      UserRES,
      RoomRES,
      HotelRES,
      OrganizationRES,
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      //generate automaticely graphQL schema using federation version 2
      autoSchemaFile: {
        federation: 2,
      },
    }),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT_RESERVATION: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
        PAYMENTS_HOST: Joi.string().required(),
        PAYMENTS_PORT: Joi.number().required(),
      }),
    }),
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
        name: PAYMENT_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            //actual name of the queu that were going to be using in this service
            queue: 'payments',
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
    ]),
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    // ReservationsRepository,
    ReservationsRepositorymySQL,
    ReservationsResolver,
    UserRepositorySQL,
    HotelRepositorySQL,
    RoomRepositorySQL,
    UserRemoteRepository,
  ],
})
export class ReservationsModule {}
