import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  const configService = app.get(ConfigService);
  /*app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'tasks',
    },
  });*/
  app.useLogger(app.get(Logger));
  //await app.startAllMicroservices();
  app.use(cookieParser());
  await app.listen(configService.get('PORT'));
}
bootstrap();
