import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.input';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id); // Call a method from the user service to fetch a specific user by ID
  }

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto); // Call a method from the user service to create a new user
  }

  @Delete('user/:id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id); // Call a method from the user service to delete a user by ID
  }

  @Get('user/:id/posts')
  async findPosts(@Param('id') id: string) {
    return await this.userService.findPosts(id); // Call a method from the user service to fetch a specific user by ID
  }

  @Get('user/:id/viewed-posts')
  async findReadPosts(@Param('id') id: string) {
    return await this.userService.findReadPosts(id); // Call a method from the user service to fetch a specific user by ID
  }
}
