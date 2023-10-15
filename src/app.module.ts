import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReadEventModule } from './read-event/read-event.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PostModule, PrismaModule, ReadEventModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
