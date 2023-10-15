import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from './dtos/create-user.input';

const db = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
  post: {
    findMany: jest.fn(),
  }
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: db,
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockPostId = faker.string.uuid();
  const mockUserId = faker.string.uuid();

  const mockUser = {
    id: mockUserId,
    email: faker.internet.email(),
    username: faker.internet.userName()
  }

  const mockPost = {
    id: mockPostId,
    title: faker.word.words(4),
    content: faker.word.words(100),
    userId: mockUserId
  }

  describe('UserService', () => {
    it('should call prisma to find one user', async () => {
      db.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne(mockUserId);

      expect(db.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: mockUserId
        }
      });

      expect(result).toStrictEqual(mockUser);
    });

    it('should call prisma to create a user', async () => {
      db.user.create.mockResolvedValue(mockUser);

      const mockCreateInput = new CreateUserDto();

      mockCreateInput.email = mockUser.email
      mockCreateInput.username = mockUser.username

      const result = await service.create(mockCreateInput);

      expect(db.user.create).toBeCalledWith({
        data: {
          email: mockCreateInput.email,
          username: mockCreateInput.username
        }
      });

      expect(result).toStrictEqual(mockUser);
    });

    it('should call prisma to remove a user', async () => {
      db.user.delete.mockResolvedValue(mockUser);

      const result = await service.remove(mockUserId);

      expect(db.user.delete).toHaveBeenCalledWith({
        where: {
          id: mockUserId
        }
      });

      expect(result).toStrictEqual(mockUser);
    });

    it('should call prisma to remove a user', async () => {
      db.user.delete.mockResolvedValue(mockUser);

      const result = await service.remove(mockUserId);

      expect(db.user.delete).toHaveBeenCalledWith({
        where: {
          id: mockUserId
        }
      });

      expect(result).toStrictEqual(mockUser);
    });

    it('should call prisma to get posts user authored', async () => {
      db.post.findMany.mockResolvedValue([mockPost]);
      
      const result = await service.findPosts(mockUserId);

      expect(db.post.findMany).toHaveBeenCalledWith({
        where: {
          userId: mockUserId
        }
      });

      expect(result).toStrictEqual([mockPost]);
    });

    it('should call prisma to get read history', async () => {
      db.post.findMany.mockResolvedValue([mockPost]);

      const result = await service.findReadPosts(mockUserId);

      expect(db.post.findMany).toHaveBeenCalledWith({
        where: {
          readEvent: {
            some: {
              userId: mockUserId
            }
          }
        }
      });

      expect(result).toStrictEqual([mockPost]);
    });
  })
});
