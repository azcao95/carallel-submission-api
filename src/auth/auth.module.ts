import { Module } from '@nestjs/common';
import { Auth0Strategy } from './auth0.strategy';

@Module({
  providers: [Auth0Strategy],
  exports: [Auth0Strategy],
})
export class AuthModule {}
