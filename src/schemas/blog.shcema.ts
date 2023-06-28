import * as mongoose from 'mongoose';
import { overwriteSchemaToJSON } from 'src/helpers/tools';

export const BlogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    body: String,
    author: String,
    datePosted: String,
  },
  {
    collection: 'blog',
  },
);

overwriteSchemaToJSON(BlogSchema);
