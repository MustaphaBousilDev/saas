import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
//import { Transport } from '@nestjs/microservices';
import { AllExceptionFilter } from '@app/shared/filter';
import { LoggerService } from './infra/logger/logger.service';
import {
  LogginInterceptor,
  ResponseInterceptor,
} from '@app/shared/interceptors';
import { tenancyMiddleware } from '@app/shared/tenancy/tenancy.middleware';
import { createDataSource } from '@app/shared/database/database.providers';
import { getTenantConnection } from '@app/shared/tenancy/tenancy.utils';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(tenancyMiddleware);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,PATCH,HEAD,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  const configService = app.get(ConfigService);
  const dataSource = createDataSource(configService);
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  await dataSource.runMigrations();
  const schemas = await dataSource.manager.query(
    'select schema_name as name from information_schema.schemata;',
  );
  for (let i = 0; i < schemas.length; i += 1) {
    const { name: schema } = schemas[i];
    if (schema.startsWith('tenant_')) {
      const tenantId = schema.replace('tenant_', '');
      console.log('id:', tenantId);
      const connection = await getTenantConnection(tenantId);
      await connection.runMigrations();
      //await connection.destroy();
    }
  }
  //transport protocol for communication microservices
  /*app.connectMicroservice({
    transport: Transport.RMQ,
    //specify host and port that we want to be listening on for our TPC microservice
    options: {
      // host: '0.0.0.0',
      // port: configService.get('TCP_PORT_AUTH'),
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      //actual name of the queu that were going to be using in this service
      queue: 'auth',
    },
  });*/
  app.use(cookieParser());
  //Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  //Pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //Interceptor
  app.useGlobalInterceptors(new LogginInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());
  // Use the Logger provided by the Nest application
  app.useLogger(app.get(Logger));
  //await app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT_AUTH'));
}
bootstrap();
