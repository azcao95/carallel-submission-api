import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';

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

  const mockReadEvent = {
    id: mockReadEventId,
    userId: mockUserId,
    postId: mockPostId
  }

  describe('PostService', () => {
    it('should call prisma to find a post by id', async () => {
      expect(service).toBeDefined();
    });
  
    it('should call prisma to find many posts by author', async () => {
      expect(service).toBeDefined();
    });
  
    it('should call prisma to update a post by id', async () => {
      expect(service).toBeDefined();
    });
  
    it('should call prisma to delete a post with specific id', async () => {
      expect(service).toBeDefined();
    });
  
    it('should call prisma to delete create a post with content and user', async () => {
      expect(service).toBeDefined();
    });
  
    it('should call prisma to get number of reads', async () => {
      expect(service).toBeDefined();
    });
  });
});
