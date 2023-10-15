import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dtos/create-post.input';
import { UpdatePostDto } from './dtos/update-post.input';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        userId: createPostDto.userId,
        title: createPostDto.title,
        content: createPostDto.content
      }
    })
  }

  async findPost(id: string) {
    return await this.prisma.post.findUnique({
      where: {
        id
      }
    })
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async updatePost(id, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: {
        id
      },
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content
      }
    })
  }

  async deletePost(id: string) {
    return await this.prisma.post.delete({
      where: {
        id
      }
    });
  }

  async countViews(id: string) {
    return await this.prisma.readEvent.count({
      where: {
        postId: id
      }
    });
  }
}
