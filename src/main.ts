import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import * as express from 'express';
import * as path from 'path';
import 'dotenv/config';

//
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.use('/public', express.static(path.join(__dirname, '..', 'public')));

  await app.listen(process.env.PORT, () => {
    Logger.log(`app start at: http://localhost:${process.env.PORT}`);
  });
}
bootstrap();
