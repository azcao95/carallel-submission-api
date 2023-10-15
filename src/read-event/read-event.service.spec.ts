import { Test, TestingModule } from '@nestjs/testing';
import { ReadEventService } from './read-event.service';
import { PrismaService } from '../prisma/prisma.service';

const db = {
  readEvent: {
    count: jest.fn(),
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

  describe('ReadEventService', () => {
    it('should get number read events by post id', async () => {
      expect(service).toBeDefined();
    });
  });
});
