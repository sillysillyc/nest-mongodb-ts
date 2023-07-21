import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRespository: Repository<User>;

  create(createUserDto: CreateUserDto) {
    this.userRespository.save(createUserDto);
  }

  findAll() {
    return this.userRespository.find();
  }

  findOne(id: number) {
    return this.userRespository.findOne({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.userRespository.save({
      id: id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    this.userRespository.delete(id);
  }
}
