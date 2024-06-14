import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './environment-config.service';
//import { validate } from './environment-config.validation';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      /*ignoreEnvFile:
        process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'
          ? false
          : true,*/
      isGlobal: true,
      validationSchema: Joi.object({
        /*JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HOST_LOCAL_PROJECT: Joi.string().required(),
        POSTGRES_HOST_DOCKER: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_PG_EMAIL: Joi.string().required(),
        POSTGRES_PG_PASSWORD: Joi.string().required(),*/
      }),
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
