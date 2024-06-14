import { NestFactory } from '@nestjs/core';
import { EmployeeModule } from './employee.module';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  console.log('################### emp coming');
  const app = await NestFactory.create(EmployeeModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,PATCH,HEAD,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'employee',
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  app.use(cookieParser());
  await app.listen(configService.get('PORT'));
}
bootstrap();
