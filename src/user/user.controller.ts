import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.input';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id); // Call a method from the user service to fetch a specific user by ID
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto); // Call a method from the user service to create a new user
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('auth0'))
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id); // Call a method from the user service to delete a user by ID
  }

  @Get(':id/posts')
  async findPosts(@Param('id') id: string) {
    return await this.userService.findPosts(id); // Call a method from the user service to fetch a specific user by ID
  }

  @Get(':id/viewed-posts')
  // @UseGuards(AuthGuard('auth0'))
  async findReadPosts(@Param('id') id: string) {
    return await this.userService.findReadPosts(id); // Call a method from the user service to fetch a specific user by ID
  }
}
