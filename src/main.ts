import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { GlobalTransformInterceptor } from './interceptors/global-transform.interceptor';
import * as express from 'express';
import * as path from 'path';
import 'dotenv/config';
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app
    .useGlobalInterceptors(new GlobalTransformInterceptor())
    .useGlobalFilters(new HttpExceptionFilter())
    .useGlobalPipes(new ValidationPipe())
    .use('/public', express.static(path.join(__dirname, '..', 'public')));

  await app.listen(process.env.PORT, () => {
    Logger.log(`app start at: http://localhost:${process.env.PORT}`);
  });
}
bootstrap();
