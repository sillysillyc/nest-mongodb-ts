import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Body,
  Query,
  Put,
  Delete,
  ValidationPipe,
  UseInterceptors,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { ValidateObjectIdPipe } from '../../pipes/validate-object-id.pipes';
import { ListInterceptor } from '../../interceptors/list.interceptor';
import {
  ValidateValueLimitPipe,
  TransformStringToNumberPipe,
} from '../../pipes';
import type { CreatePostDTO } from './dto/create-post.dto';
import type { PostDTO } from './dto/post.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseInterceptors(ListInterceptor)
  @Get()
  async getPosts(
    @Query('page', new TransformStringToNumberPipe()) page: number,
    @Query('pageSize', new ValidateValueLimitPipe({ limit: [10, 50] }))
    pageSize: number,
  ) {
    if (!page || !pageSize) {
      throw new BadRequestException('参数缺失');
    }

    const { data: blogs, total } = await this.blogService.getPosts({
      page,
      pageSize,
    });
    return { data: blogs, total, page, pageSize };
  }

  @Get('/:postId')
  async getPost(@Param('postId', ValidateObjectIdPipe) postId: string) {
    const post = await this.blogService.getPost(postId);
    return post;
  }

  @Post()
  async addPost(@Body(ValidationPipe) basePostDTO: PostDTO) {
    await this.blogService.addPost(basePostDTO);
    return;
  }

  @Put('/:postId')
  async editPost(
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Body() createPostDTO: Partial<CreatePostDTO>,
  ) {
    const editedPost = await this.blogService.editPost(postId, createPostDTO);

    if (!editedPost) {
      throw new HttpException('请求失败!', HttpStatus.OK);
    }

    return;
  }

  @Delete('/:postId')
  async deletePost(@Param('postId', ValidateObjectIdPipe) postId: string) {
    await this.blogService.deletePost(postId);
    return;
  }

  // @Delete('/:postId')
  // async deletePost(@Res() res, @Param('postId', ValidateObjectIdPipe) postId) {
  //   const deletedPost = await this.blogService.deletePost(postId);
  //   const resp = {
  //     resultCode: CustomCode.SUCCESS,
  //     resultMsg: '请求成功',
  //   };

  //   if (!deletedPost) {
  //     resp.resultCode = CustomCode.ERROR;
  //     resp.resultMsg = 'Blog does not exist!';
  //   }

  //   return res.status(HttpStatus.OK).json(resp);
  // }
}
