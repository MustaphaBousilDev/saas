import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);
  /*app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      //actual name of the queu that were going to be using in this service
      queue: 'notifications',
    },
  });*/
  app.useLogger(app.get(Logger));
  //await app.startAllMicroservices();
  // await app.listen(configService.get('HTTP_PORT_NOTIFICATIONS'));
}
bootstrap();
