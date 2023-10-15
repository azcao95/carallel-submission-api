import { Test, TestingModule } from '@nestjs/testing';
import { ReadEventController } from './read-event.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ReadEventService } from './read-event.service';
import { faker } from '@faker-js/faker';


const readEventService = {
  createReadEvent: jest.fn(),
}


describe('ReadEventController', () => {
  let controller: ReadEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReadEventController],
      providers: [
        {
          provide: PrismaService,
          useValue: {}
        },
        {
          provide: ReadEventService,
          useValue: readEventService
        }
      ]
    }).compile();

    controller = module.get<ReadEventController>(ReadEventController);
  });

  const mockReadEventId = faker.string.uuid();
  const mockUserId = faker.string.uuid();
  const mockPostId = faker.string.uuid();

  const mockReadEvent = {
    id: mockReadEventId,
    userId: mockUserId,
    postId: mockPostId
  }

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ReadEventController', () => {
    it('should call readEventService create a read event for post and user', async () => {
      readEventService.createReadEvent.mockResolvedValue(mockReadEvent);

      const result = await controller.createReadEvent(mockUserId, mockPostId);

      expect(readEventService.createReadEvent).toHaveBeenCalledWith(mockUserId, mockPostId);
      expect(result).toEqual(mockReadEvent);
    });
  });
});
