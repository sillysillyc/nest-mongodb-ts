import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDBModule } from './db';
import { MySqlModule } from './db/mysql/mysql.module';
import { BlogModule, UserModule } from './apis';

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
