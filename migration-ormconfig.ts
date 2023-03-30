import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import {dataSourceOptions} from './src/ormconfig';

const options = {
  ...dataSourceOptions,
  migrations: [__dirname + '/migrations/*.ts'],
} as DataSourceOptions | TypeOrmModuleOptions;

export default new DataSource(options as DataSourceOptions);
