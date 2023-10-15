import { Test, TestingModule } from '@nestjs/testing';
import { ReadEventService } from './read-event.service';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';

const db = {
  readEvent: {
    create: jest.fn(),
  }
}

describe('ReadEventService', () => {
  let service: ReadEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadEventService,
        {
          provide: PrismaService,
          useValue: db
        }
      ],
    }).compile();

    service = module.get<ReadEventService>(ReadEventService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockReadEventId = faker.string.uuid();
  const mockUserId = faker.string.uuid();
  const mockPostId = faker.string.uuid();

  const mockReadEvent = {
    id: mockReadEventId,
    userId: mockUserId,
    postId: mockPostId
  }

  describe('ReadEventService', () => {
    it('should create read event with user id and post id', async () => {
      db.readEvent.create.mockResolvedValue(mockReadEvent);

      const result = await service.createReadEvent(mockUserId, mockPostId);

      expect(db.readEvent.create).toHaveBeenCalledWith({
        data: {
          user: {
            connect: {
              id: mockUserId
            }
          },
          post: {
            connect: {
              id: mockPostId
            }
          }
        }
      });

      expect(result).toEqual(mockReadEvent);
    });
  });
});
