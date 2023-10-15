import { Module } from '@nestjs/common';
import { ReadEventController } from './read-event.controller';
import { ReadEventService } from './read-event.service';

@Module({
  controllers: [ReadEventController],
  providers: [ReadEventService]
})
export class ReadEventModule {}
