import { NestFactory } from '@nestjs/core';
import { StockModule } from './stock.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(StockModule);
  const configService = await app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'stock',
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  app.use(cookieParser());
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
