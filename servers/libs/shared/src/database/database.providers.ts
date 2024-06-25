// database.providers.ts
import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';
//import { SnakeNamingStrategy } from './snake-naming.strategy'; // If you need custom naming strategy

export const createDataSource = (configService: ConfigService): DataSource => {
  return new DataSource({
    type: 'postgres',
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    port: +configService.get<number>('POSTGRES_PORT'),
    host: configService.get('POSTGRES_HOST_LOCAL_PROJECT'),
    database: configService.get('POSTGRES_DB'),
    //entities: [/* your entities here */],
    //migrations: [/* your migrations here */],
    //namingStrategy: new SnakeNamingStrategy(),
    synchronize: true, // Ensure this is false in production
    //logging: true,
    //entities: [join(__dirname, './modules/public/**/*.entity{.ts,.js}')],
    //migrations: [join(__dirname, './migrations/public/*{.ts,.js}')],
  });
};
