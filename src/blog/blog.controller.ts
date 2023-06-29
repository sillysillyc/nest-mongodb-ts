import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  Post,
  Body,
  Query,
  Put,
  Delete,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipes';
import { CustomCode } from 'src/helpers/codes';
import { ListInterceptor } from 'src/interceptors/list.interceptor';
import { ValidateValueLimitPipe } from 'src/pipes/validate-value-limit.pipes';
import type { CreatePostDTO } from './dto/create-post.dto';
import type { PostDTO } from './dto/post.dto';
import type { ObjectId } from 'mongoose';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseInterceptors(ListInterceptor)
  @Get()
  async getPosts(
    @Query('page') _page = '1',
    @Query('pageSize', new ValidateValueLimitPipe({ limit: [10, 50] }))
    _pageSize = '10',
  ) {
    const pagination = {
      page: Number(_page),
      pageSize: Number(_pageSize),
    };
    const { data: blogs, total } = await this.blogService.getPosts(pagination);
    return { data: blogs, total, ...pagination };
  }

  @Get('/:postId')
  async getPost(@Param('postId', new ValidateObjectIdPipe()) postId: ObjectId) {
    const post = await this.blogService.getPost(postId);
    if (!post) {
      // throw new NotFoundException('Post does not exist!');
      return;
    }
    return post;
  }

  @Post()
  async addPost(@Body(ValidationPipe) basePostDTO: PostDTO) {
    await this.blogService.addPost(basePostDTO);
    return;
  }

  @Put('/:postId')
  async editPost(
    @Res() res,
    @Param('postId', ValidateObjectIdPipe) postId,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    const editedPost = await this.blogService.editPost(postId, createPostDTO);

    const resp = {
      resultCode: CustomCode.SUCCESS,
      resultMsg: '修改成功',
    };

    if (!editedPost) {
      resp.resultCode = CustomCode.ERROR;
      resp.resultMsg = '请求失败!';
    }

    return res.status(HttpStatus.OK).json(resp);
  }

  @Delete('/:postId')
  async deletePost(@Res() res, @Param('postId', ValidateObjectIdPipe) postId) {
    const deletedPost = await this.blogService.deletePost(postId);
    const resp = {
      resultCode: CustomCode.SUCCESS,
      resultMsg: '请求成功',
    };

    if (!deletedPost) {
      resp.resultCode = CustomCode.ERROR;
      resp.resultMsg = 'Blog does not exist!';
    }

    return res.status(HttpStatus.OK).json(resp);
  }
}
