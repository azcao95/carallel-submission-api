import { Controller, Post } from '@nestjs/common';
import { ReadEventService } from './read-event.service';

@Controller('read-event')
export class ReadEventController {
  constructor(private readEventService: ReadEventService) {}

  @Post('read-event')
  async createReadEvent(userId: string, postId: string) {
    return await this.readEventService.createReadEvent(userId, postId);
  }
}
