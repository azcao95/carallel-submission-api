import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from './dtos/update-post.input';
import { CreatePostDto } from './dtos/create-post.input';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findPost(id);
  }

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Put('/:id/') 
  async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.updatePost(id, updatePostDto);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(id);
  }

  @Get(':id/views')
  async countViews(@Param('id') id: string) {
    return await this.postService.countViews(id);
  }
}
