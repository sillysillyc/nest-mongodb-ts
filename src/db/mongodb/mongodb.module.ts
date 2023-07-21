import { Module, Global, DynamicModule } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config({
  path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
});

const {
  MONGO_DB_USER: DB_USER,
  MONGO_DB_PWD: DB_PWD,
  MONGO_DB_NAME: DB_NAME,
  MONGO_DB_PORT: DB_PORT,
  MONGO_DB_ADDRESS: DB_ADDRESS,
} = process.env;
const dbLink = `mongodb://${DB_USER}:${encodeURIComponent(
  DB_PWD,
)}@${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`;

@Global()
@Module({})
export class MongoDBModule {
  static forRoot(mongoUri?: string): DynamicModule {
    return {
      module: MongoDBModule,
      imports: [
        MongooseModule.forRoot(mongoUri || dbLink, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
      ],
      exports: [MongooseModule],
    };
  }

  static forFeature(modelDefinition?: ModelDefinition[]): DynamicModule {
    return {
      module: MongoDBModule,
      imports: [MongooseModule.forFeature(modelDefinition)],
      exports: [MongooseModule],
    };
  }
}
