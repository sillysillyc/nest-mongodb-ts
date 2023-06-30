import { type ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { dbLink } from '../app.module';

export const mongoDBImports = (options: ModelDefinition[]) => [
  MongooseModule.forRoot(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
  MongooseModule.forFeature(options),
];
