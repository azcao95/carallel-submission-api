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
  },
  readEvent: {
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

  const mockUuid = faker.string.uuid();
  const mockPostId = faker.string.uuid();
  const mockUserId = faker.string.uuid();
  const mockReadEventId = faker.string.uuid();

  const mockUser = {
    id: mockUuid,
    email: faker.internet.email(),
    username: faker.internet.userName()
  }

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
  describe('UserService', () => {
    it('should call prisma to find one user', async () => {
      db.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne(mockUuid);

      expect(db.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: mockUuid
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

      const result = await service.remove(mockUuid);

      expect(db.user.delete).toHaveBeenCalledWith({
        where: {
          id: mockUuid
        }
      });

      expect(result).toStrictEqual(mockUser);
    });

    it('should call prisma to remove a user', async () => {
      db.user.delete.mockResolvedValue(mockUser);

      const result = await service.remove(mockUuid);

      expect(db.user.delete).toHaveBeenCalledWith({
        where: {
          id: mockUuid
        }
      });

      expect(result).toStrictEqual(mockUser);
    });

    it('should call prisma to get posts user authored', async () => {
      expect(service).toBeDefined();
    });

    it('should call prisma to get read history', async () => {
      expect(service).toBeDefined();
    });
  })
});
