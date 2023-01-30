import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

let expressApp: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['as123dqwrsad']
  }))
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  await app.init();

  return app.getHttpAdapter().getInstance()
}

bootstrap();
