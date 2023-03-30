import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import {dataSourceOptions} from './ormconfig';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot(dataSourceOptions),

    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'sqlite',
    //     database: configService.get<string>('DB_NAME'),
    //     // database: ':memory:',
    //     entities: [User, Report],
    //     synchronize: true,
    //   }),
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   // database: ':memory:',
    //   entities: [User, Report],
    //   synchronize: true,
    // })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    }
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) { }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieSession({
        keys: [this.configService.get<string>('COOKIE_KEY')]
      }))
      .forRoutes('*');
  }
}
