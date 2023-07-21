import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { config } from 'dotenv';

config({
  path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
});
const { DB_USER, DB_PWD, DB_ADDRESS, DB_NAME, DB_PORT } = process.env;
export const dbLink = `mongodb://${DB_USER}:${encodeURIComponent(
  DB_PWD,
)}@${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`;

@Module({
  imports: [
    MongooseModule.forRoot(dbLink, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
