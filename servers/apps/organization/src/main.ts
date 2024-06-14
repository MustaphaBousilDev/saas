import { NestFactory } from '@nestjs/core';
import { OrganizationModule } from './organization.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(OrganizationModule);
  // Parse application/json
  app.use(bodyParser.json());
  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'organization',
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  app.use(cookieParser());
  await app.listen(configService.get('PORT'));
}
bootstrap();
