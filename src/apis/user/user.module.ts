import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MySqlModule } from 'src/db/mysql/mysql.module';
import { User } from './entities/user.entity';

@Module({
  imports: [MySqlModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
