import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { CreatePostDto } from './dtos/create-post.input';
import { UpdatePostDto } from './dtos/update-post.input';
import exp from 'constants';

const db = {
  post: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    create: jest.fn()
  },
  readEvent: {
    count: jest.fn()
  },
}

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PrismaService,
          useValue: db
        }
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockPostId = faker.string.uuid();
  const mockUserId = faker.string.uuid();
  const mockReadEventId = faker.string.uuid();
  const mockPost = {
    id: mockPostId,
    title: faker.word.words(4),
    content: faker.word.words(100),
    userId: mockUserId
  }

  describe('PostService', () => {
    it('should call prisma to create a post with content and user', async () => {
      db.post.create.mockResolvedValue(mockPost);

      const mockCreateInput = new CreatePostDto();
      mockCreateInput.userId = mockUserId;
      mockCreateInput.title = faker.word.words(3);
      mockCreateInput.content = faker.word.words(10);

      const result = await service.create(mockCreateInput);

      expect(db.post.create).toHaveBeenCalledWith({
        data: {
          userId: mockCreateInput.userId,
          title: mockCreateInput.title,
          content: mockCreateInput.content
        }
      });

      expect(result).toStrictEqual(mockPost);
    });

    it('should call prisma to find all posts', async () => {
      db.post.findMany.mockResolvedValue([mockPost]);

      const result = await service.findAll();

      expect(db.post.findMany).toHaveBeenCalled();

      expect(result).toStrictEqual([mockPost]);
    });
    
    it('should call prisma to find a post by id', async () => {
      db.post.findUnique.mockResolvedValue(mockPost);

      const result = await service.findPost(mockUserId);

      expect(db.post.findUnique).toHaveBeenCalledWith({
        where: {
          id: mockUserId
        }
      });

      expect(result).toStrictEqual(mockPost);
    });
  
    it('should call prisma to update a post by id', async () => {
      db.post.update.mockResolvedValue(mockPost);

      const mockCreateInput = new UpdatePostDto();
      mockCreateInput.id = mockUserId;
      mockCreateInput.title = faker.word.words(3);
      mockCreateInput.content = faker.word.words(10);

      const result = await service.updatePost(mockUserId, mockCreateInput);

      expect(db.post.update).toHaveBeenCalledWith({
        where: {
          id: mockUserId
        },
        data: {
          title: mockCreateInput.title,
          content: mockCreateInput.content
        }
      });

      expect(result).toStrictEqual(mockPost);
    });
  
    it('should call prisma to delete a post with specific id', async () => {
      db.post.delete.mockResolvedValue(mockPost);

      const result = await service.deletePost(mockPostId);

      expect(db.post.delete).toHaveBeenCalledWith({
        where: {
          id: mockPostId
        }
      });

      expect(result).toStrictEqual(mockPost);
    });
  
    it('should call prisma to get number of reads', async () => {
      db.readEvent.count.mockResolvedValue(1);

      const result = await service.countViews(mockPostId);

      expect(db.readEvent.count).toHaveBeenCalledWith({
        where: {
          postId: mockPostId
        }
      });

      expect(result).toBe(1);
    });
  });
});
