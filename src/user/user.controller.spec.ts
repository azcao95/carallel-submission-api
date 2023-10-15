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
  findReadEvents: jest.fn(),
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

  const mockUuid = faker.string.uuid();

  const mockUser = {
    id: mockUuid,
    email: faker.internet.email(),
    username: faker.internet.userName()
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

      const result = await controller.remove(mockUuid);

      expect(userService.remove).toBeCalled();
      expect(result).toStrictEqual(mockUser);
    });

    it('should call user service to find posts', async () => {
      expect(controller).toBeDefined();
    });

    it('should call user service to find read events', async () => {
      expect(controller).toBeDefined();
    });
  });
});
