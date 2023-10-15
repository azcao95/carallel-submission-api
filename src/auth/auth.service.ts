import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(profile: any) {
    const { email } = profile;

    if (!email) {
      return null;
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  }
}
