import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    }) 
  }
  
  async create(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto
    
    return await this.prisma.user.create({
      data: {
        email,
        username,
      }
    })
  }
  
  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
