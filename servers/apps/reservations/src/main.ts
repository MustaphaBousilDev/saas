import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create an instance of the Nest application using the ReservationsModule
  const app = await NestFactory.create(ReservationsModule);
  // Start the application and make it listen on port 5000
  const configService = app.get(ConfigService);
  //transport protocol for communication microservice
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'reservations',
    },
  });
  // Apply a global validation pipe to the application for validation dto
  //#(whitelist: true)If set to true validator will strip validated object of any properties that do not have any decorators.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Use the Logger provided by the Nest application
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  app.use(cookieParser());
  await app.listen(configService.get('HTTP_PORT_RESERVATION'));
}
bootstrap();
