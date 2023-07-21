import { Module, Global, DynamicModule } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config({
  path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
});

const { DB_USER, DB_PWD, DB_ADDRESS, DB_NAME, DB_PORT } = process.env;
const dbLink = `mongodb://${DB_USER}:${encodeURIComponent(
  DB_PWD,
)}@${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`;

@Global()
@Module({})
export class TestDatabaseModule {
  static forRoot(mongoUri?: string): DynamicModule {
    return {
      module: TestDatabaseModule,
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
      module: TestDatabaseModule,
      imports: [MongooseModule.forFeature(modelDefinition)],
      exports: [MongooseModule],
    };
  }
}
