import { Module } from '@nestjs/common';
import { ReadEventController } from './read-event.controller';
import { ReadEventService } from './read-event.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReadEventController],
  providers: [ReadEventService]
})
export class ReadEventModule {}
