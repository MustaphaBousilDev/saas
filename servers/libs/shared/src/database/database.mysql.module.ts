import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { createDataSource } from './database.providers';
//import { join } from 'path';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      //imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dataSource = createDataSource(configService);
        await dataSource.initialize();
        const options: TypeOrmModuleOptions = {
          ...dataSource.options,
          autoLoadEntities: true,
        };
        return options;
      },
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModulemySQL {
  static forFeature(models: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(models);
  }
}
