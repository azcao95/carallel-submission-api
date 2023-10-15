import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PostService } from './post.service';
import { faker } from '@faker-js/faker';
import exp from 'constants';
import { CreatePostDto } from './dtos/create-post.input';
import { mock } from 'node:test';
import { UpdatePostDto } from './dtos/update-post.input';

const postService = {
  findPost: jest.fn(),
  findAll: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
  countViews: jest.fn()
}

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PrismaService,
          useValue: {}
        },
        {
          provide: PostService,
          useValue: postService
        }
      ]
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  const mockPostId = faker.string.uuid();
  const mockUserId = faker.string.uuid();

  const mockPost = {
    id: mockPostId,
    title: faker.word.words(4),
    content: faker.word.words(100),
    userId: mockUserId
  }

  describe('PostController', () => {
    it('should call post service to find one post', async () => {
      postService.findPost.mockResolvedValue(mockPost);

      const result = await controller.findOne(mockPostId);

      expect(postService.findPost).toHaveBeenCalledWith(mockPostId);
      expect(result).toEqual(mockPost);
    });
  
    it('should call post service to find all posts', async () => {
      postService.findAll.mockResolvedValue([mockPost]);

      const result = await controller.findAll();

      expect(postService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockPost]);
    });
  
    it('should call post service to update post with id', async () => {
      postService.updatePost.mockResolvedValue(mockPost);

      let mockUpdateInput = new UpdatePostDto();

      mockUpdateInput.title = faker.word.words(3);
      mockUpdateInput.content = faker.word.words(10);

      const result = await controller.updatePost(mockPostId, mockUpdateInput);

      expect(postService.updatePost).toHaveBeenCalledWith(mockPostId, mockUpdateInput);
      expect(result).toEqual(mockPost);
    });
  
    it('should call post service to delete post with id', async () => {
      postService.deletePost.mockResolvedValue(mockPost);

      const result = await controller.deletePost(mockPostId);

      expect(postService.deletePost).toHaveBeenCalledWith(mockPostId);
      expect(result).toEqual(mockPost);
    });
  
    it('should call post service to get read count', async () => {
      postService.countViews.mockResolvedValue(1);

      const result = await controller.countViews(mockPostId);

      expect(postService.countViews).toHaveBeenCalledWith(mockPostId);
      expect(result).toEqual(1);
    });
  });
});
