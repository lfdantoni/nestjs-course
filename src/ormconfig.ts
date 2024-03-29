import { DataSourceOptions } from "typeorm";

let dataSourceOptions: DataSourceOptions = {
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
 } as DataSourceOptions;

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'db.sqlite',
    });
    break;
  case 'test':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'test.sqlite',
    });
    break;
  case 'production':
    Object.assign(dataSourceOptions, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationRun: true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      ssl: {
        rejectUnauthorized: false,
      }
    });
    break;
  default:
    throw new Error('unknown environment');
}

export {dataSourceOptions};
