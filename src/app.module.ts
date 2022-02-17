import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/nest', {
    MongooseModule.forRoot('mongodb://47.98.149.5/nest', {
      // MongooseModule.forRoot('mongodb://nestUser:password@47.98.149.5/nest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
