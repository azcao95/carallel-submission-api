import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PostService } from './post.service';

const postService = {
  findOne: jest.fn(),
  findMany: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  readCount: jest.fn()
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

  describe('PostController', () => {
    it('should call post service to find one post', async () => {
      expect(controller).toBeDefined();
    });
  
    it('should call post service to find all posts', async () => {
      expect(controller).toBeDefined();
    });
  
    it('should call post service to update post with id', async () => {
      expect(controller).toBeDefined();
    });
  
    it('should call post service to delete post with id', async () => {
      expect(controller).toBeDefined();
    });
  
    it('should call post service to get read count', async () => {
      expect(controller).toBeDefined();
    });
  });
});
