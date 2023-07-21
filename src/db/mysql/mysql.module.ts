import { Module, Global, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { config } from 'dotenv';
import { User } from '../../apis/user/entities/user.entity';

config({
  path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
});

const {
  MYSQL_DB_USER: DB_USER,
  MYSQL_DB_ADDRESS: DB_ADDRESS,
  MYSQL_DB_PWD: DB_PWD,
  MYSQL_DB_NAME: DB_NAME,
  MYSQL_DB_PORT: DB_PORT,
} = process.env;

@Global()
@Module({})
export class MySqlModule {
  static forRoot(): DynamicModule {
    return {
      module: MySqlModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: DB_ADDRESS,
          port: Number(DB_PORT),
          username: DB_USER,
          password: DB_PWD,
          database: DB_NAME,
          synchronize: true,
          logging: true,
          entities: [User],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'caching_sha2_password',
          },
        }),
      ],
      exports: [TypeOrmModule],
    };
  }

  static forFeature(entities?: EntityClassOrSchema[]): DynamicModule {
    return {
      module: MySqlModule,
      imports: [TypeOrmModule.forFeature(entities)],
      exports: [TypeOrmModule],
    };
  }
}
