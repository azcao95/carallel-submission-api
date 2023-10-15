import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AuthService]
})
export class AuthModule {}
