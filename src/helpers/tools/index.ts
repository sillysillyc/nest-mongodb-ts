import type { Schema } from 'mongoose';

/**
 *
 * 重写 toJSON
 *
 * 删除 __v
 *
 * id 代替 _id
 */
export const overwriteSchemaToJSON = (schema: Schema) =>
  schema.set('toJSON', {
    transform: (_, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
  });
