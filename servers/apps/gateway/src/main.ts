import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { setApp } from './app';

async function bootstrap() {
  console.log('hahahhaha"###############"""');
  const app = await NestFactory.create(GatewayModule);
  //app.use(new CorsMiddleware().use); // Use the CorsMiddleware
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,PATCH,HEAD,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  await app.listen(configService.getOrThrow('PORT'));
  setApp(app); //now i can use setApp for my our authContext
}
bootstrap();
