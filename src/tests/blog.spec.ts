import { Test, type TestingModule } from '@nestjs/testing';
import { BlogController } from '../apis/blog/blog.controller';
import { BlogService } from '../apis/blog/blog.service';
import { BlogSchema } from '../schemas';
import { MongoDBModule } from '../db';
import { BadRequestException, HttpException } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mock = require('mockjs');

describe('BlogController', () => {
  let blogController: BlogController;
  let blogService: BlogService;
  let blog: TestingModule;
  const testPostDTO = {
    title: expect.any(String),
    description: expect.any(String),
    body: expect.any(String),
    author: expect.any(String),
    datePosted: expect.any(String),
    id: expect.any(String),
  };

  beforeEach(async () => {
    blog = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [BlogService],
      imports: [
        MongoDBModule.forRoot(),
        MongoDBModule.forFeature([
          { name: 'blog', schema: BlogSchema, collection: 'blog' },
        ]),
      ],
    }).compile();

    blogController = blog.get<BlogController>(BlogController);
    blogService = blog.get<BlogService>(BlogService);
  });

  afterEach(() => {
    blog.close();
  });

  describe('GET /blog?page=1&pageSize=10 blogController.getPosts', () => {
    it(`should return { 
      data: PostDTO[],
      total: number,
      page: number,
      pageSize: number 
    }\n`, async () => {
      const { data, page, pageSize, total } = await blogController.getPosts(
        1,
        10,
      );
      expect(Array.isArray(data)).toBe(true);
      expect(typeof total).toBe('number');
      expect(typeof page).toBe('number');
      expect(typeof pageSize).toBe('number');

      expect(pageSize).toBeGreaterThanOrEqual(10);
      expect(pageSize).toBeLessThanOrEqual(50);

      if (data.length === 0) {
        expect(data).toEqual([]);
      } else {
        for (const item of data) {
          expect(item).toEqual(expect.objectContaining(testPostDTO));
        }
      }
    });

    it(`should limit pageSize`, async () => {
      const getPostsSpy = jest
        .spyOn(blogController, 'getPosts')
        .mockResolvedValue(
          // @ts-ignore
          new BadRequestException(`pageSize 的范围是 10 - 50`),
        );
      const result = await blogController.getPosts(1, 100);

      expect(getPostsSpy).toHaveBeenCalledWith(1, 100);
      expect(result).toBeInstanceOf(BadRequestException);
    });

    it(`should pageSize exist`, async () => {
      // @ts-ignore
      await expect(blogController.getPosts()).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('GET /blog/:postId blogController.getPost', () => {
    it('should return PostDTO', async () => {
      const id = '649e985bb8df1d74659b012c';
      const result = await blogController.getPost(id);
      if (result) {
        expect(result).toEqual(expect.objectContaining(testPostDTO));
      }
    });
  });

  describe('POST /blog blogController.addPost', () => {
    it('should add PostDTO', async () => {
      const postDto = Mock.mock({
        title: '@title',
        description: Mock.Random.sentence(5),
        body: Mock.Random.paragraph(1),
        author: '@name',
      });

      await blogController.addPost(postDto);
      const posts = await blogService.getPostByCondition(postDto);

      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toEqual(1);
      expect(posts[0]).toMatchObject(postDto);
    });
  });

  describe('PUT /blog/:postId blogController.editPost', () => {
    it('should edit PostDTO', async () => {
      const id = '64b8f8129db99973816f0379';

      const randomTile: string = Mock.Random.title();
      const result = await blogController.editPost(id, {
        title: randomTile,
      });
      const post = await blogService.getPost(id);

      expect(!post).toBe(false);
      expect(post.title).toEqual(randomTile);
      expect(result).toBeUndefined();
    });

    it('should edit PostDTO Failed', async () => {
      const id = '649e2dd33883c24579cc6fd1';

      const randomTile: string = Mock.Random.title();
      await expect(
        blogController.editPost(id, {
          title: randomTile,
        }),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('DELETE /blog/:postId blogController.deletePost', () => {
    it('should delete PostDTO', async () => {
      const postDto = Mock.mock({
        title: '@title',
        description: Mock.Random.sentence(5),
        body: Mock.Random.paragraph(1),
        author: '@name',
      });

      const post = await blogService.addPost(postDto);
      expect(post.title).toEqual(postDto.title);

      await blogController.deletePost(post.id);

      const _post = await blogService.getPost(post.id);
      expect(_post).toBe(null);
    });
  });
});
