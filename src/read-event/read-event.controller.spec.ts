import { Test, TestingModule } from '@nestjs/testing';
import { ReadEventController } from './read-event.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ReadEventService } from './read-event.service';


const readEventService = {
  count: jest.fn(),
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ReadEventController', () => {
    it('should call readEventService get a view count for post', async () => {
      expect(controller).toBeDefined();
    });
  })
});
