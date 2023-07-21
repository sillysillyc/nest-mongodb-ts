import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogSchema } from '../../schemas';
import { MongoDBModule } from '../../db';

@Module({
  imports: [
    MongoDBModule.forFeature([
      { name: 'blog', schema: BlogSchema, collection: 'blog' },
    ]),
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
