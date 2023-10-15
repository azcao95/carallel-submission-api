import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventLogModule } from './event-log/event-log.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReadEventModule } from './read-event/read-event.module';

@Module({
  imports: [UserModule, EventLogModule, PostModule, PrismaModule, ReadEventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
