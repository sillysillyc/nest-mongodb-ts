import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './apis/blog/blog.module';
import { MongoDBModule } from './db';
import { UserModule } from './apis/user/user.module';
import { MySqlModule } from './db/mysql/mysql.module';

@Module({
  imports: [
    MongoDBModule.forRoot(),
    MySqlModule.forRoot(),
    BlogModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
