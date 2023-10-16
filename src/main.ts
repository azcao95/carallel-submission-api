import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';        
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-oauth2-jwt-bearer';

const prisma = new PrismaClient()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const jwtCheck = auth({
    audience: 'https://alex-auth0-api.com',
    issuerBaseURL: 'https://dev-kridiol0io8grymk.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

  app.use(jwtCheck);

  await app.listen(3000);
}
bootstrap();
