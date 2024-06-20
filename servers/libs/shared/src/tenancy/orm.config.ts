import { join } from 'path';
const tenantsOrmconfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'erp_auth',
  //logging: true,
  //namingStrategy: new SnakeNamingStrategy(),
  //logging: true,
  autoLoadEntities: true,
  synchronize: true,
  entities: [join(__dirname, './modules/public/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/public/*{.ts,.js}')],
};

export = tenantsOrmconfig;
