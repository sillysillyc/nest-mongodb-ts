import { type ModelDefinition, MongooseModule } from '@nestjs/mongoose';

export const mongoDBImports = (options: ModelDefinition[]) => [
  MongooseModule.forRoot('mongodb://47.98.149.5/nest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
  MongooseModule.forFeature(options),
];
