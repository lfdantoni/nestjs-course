import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieSession({
  //   keys: ['as123dqwrsad']
  // }))
  
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true
  //   })
  // );
  const port = process.env.PORT || 3000;
  await app.listen(port, () => console.log(`Listening on port ${port}`));
}
bootstrap();
