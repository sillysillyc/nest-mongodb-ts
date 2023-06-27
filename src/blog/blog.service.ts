import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostDTO } from './dto/post.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel('blog') private readonly postModel: Model<Post>) {}

  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async getPost(postID): Promise<Post> {
    console.log('test');
    const post = await this.postModel.findById(postID).exec();
    return post;
  }

  async addPost(basePostDTO: PostDTO): Promise<Post> {
    const date_posted = new Date()
      .toLocaleString('zh-CN', { hour12: false })
      .replace(/\//g, '-');
    const createPostDTO = {
      ...basePostDTO,
      date_posted,
    };

    const newPost = await new this.postModel(createPostDTO);
    return newPost.save();
  }

  async editPost(postID, createPostDTO: CreatePostDTO): Promise<Post> {
    const editedPost = await this.postModel.findByIdAndUpdate(
      postID,
      createPostDTO,
      { new: true },
    );
    return editedPost;
  }

  async deletePost(postID): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndRemove(postID);
    return deletedPost;
  }
}
