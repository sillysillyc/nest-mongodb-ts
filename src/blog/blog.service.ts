import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import type { Blog } from './interfaces/blog.interface';
import type { CreatePostDTO } from './dto/create-post.dto';
import type { PostDTO } from './dto/post.dto';
import type { ObjectId } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(@InjectModel('blog') private readonly blogModel: Model<Blog>) {}

  getPosts = async (params: {
    page: number;
    pageSize: number;
  }): Promise<{ data: Blog[]; total: number }> => {
    const total = await this.blogModel.countDocuments();
    const blogs = await this.blogModel
      .find()
      .skip((params.page - 1) * params.pageSize)
      .limit(params.pageSize)
      .exec();

    return { data: blogs, total };
  };

  async getPost(postID: ObjectId): Promise<Blog> {
    console.log('test');
    const post = await this.blogModel.findById(postID).exec();
    return post;
  }

  async addPost(basePostDTO: PostDTO): Promise<Blog> {
    const datePosted = new Date()
      .toLocaleString('zh-CN', { hour12: false })
      .replace(/\//g, '-');
    const createPostDTO = {
      ...basePostDTO,
      datePosted,
    };

    const newPost = new this.blogModel(createPostDTO);
    return newPost.save();
  }

  async editPost(postID, createPostDTO: CreatePostDTO): Promise<Blog> {
    const editedPost = await this.blogModel.findByIdAndUpdate(
      postID,
      createPostDTO,
      { new: true },
    );
    return editedPost;
  }

  async deletePost(postID): Promise<any> {
    const deletedPost = await this.blogModel.findByIdAndRemove(postID);
    return deletedPost;
  }
}
