import { Body, Controller, Post } from '@nestjs/common';
import { ReadEventService } from './read-event.service';
import { CreateReadEventDto } from './dtos/create-read-event.input';

@Controller('read-events')
export class ReadEventController {
  constructor(private readEventService: ReadEventService) {}

  @Post()
  async createReadEvent(@Body() createReadEventDto: CreateReadEventDto) {
    return await this.readEventService.createReadEvent(createReadEventDto.userId, createReadEventDto.postId);
  }
}
