import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from './dtos/update-post.input';
import { CreatePostDto } from './dtos/create-post.input';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('post/:id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findPost(id);
  }

  @Get('posts')
  async findAll() {
    return await this.postService.findAll();
  }

  @Put('post/:id/') 
  async updatePost(@Param('id') id: string, updatePostDto: UpdatePostDto) {
    return await this.postService.updatePost(id, updatePostDto);
  }

  @Post('post/')
  async createPost(createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(id);
  }

  @Get('post/:id/views')
  async countViews(@Param('id') id: string) {
    return await this.postService.countViews(id);
  }
}
