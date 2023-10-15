import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from './dtos/create-user.input';

const userService = {
  findOne: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
  findPosts: jest.fn(),
  findReadPosts: jest.fn(),
}

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: userService
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
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


  describe('UserController', () => {
    it('should call user service find one method', async () => {
      const mockUuid = faker.string.uuid();

      userService.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne(mockUuid);

      expect(userService.findOne).toBeCalled();
      expect(result).toStrictEqual(mockUser);
    });

    it('should call user service create method', async () => {
      let mockCreateInput = new CreateUserDto();

      mockCreateInput.email = mockUser.email;
      mockCreateInput.username = mockUser.username;

      userService.create.mockResolvedValue(mockUser);

      const result = await controller.create(mockCreateInput);
      
      expect(userService.create).toBeCalled();
      expect(result).toStrictEqual(mockUser);
    });

    it ('should call user service delete method', async () => {
      userService.remove.mockResolvedValue(mockUser);

      const result = await controller.remove(mockUserId);

      expect(userService.remove).toBeCalled();
      expect(result).toStrictEqual(mockUser);
    });

    it('should call user service to find posts', async () => {
      userService.findPosts.mockResolvedValue([mockPost]);

      const result = await controller.findPosts(mockUserId);

      expect(userService.findPosts).toBeCalled();
      expect(result).toStrictEqual(mockUser);
    });

    it('should call user service to find read posts', async () => {
      userService.findReadPosts.mockResolvedValue([mockPost]);

      const result = await controller.findReadPosts(mockUserId);

      expect(userService.findReadPosts).toBeCalled();
      expect(result).toStrictEqual(mockUser);    });
  });
});
