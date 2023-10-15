import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReadEventService {
  constructor(private prisma: PrismaService) {}

  async createReadEvent(userId: string, postId: string) {
    return this.prisma.readEvent.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        post: {
          connect: {
            id: postId
          }
        }
      }
    })
  }
}
