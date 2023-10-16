import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      domain: process.env.AUTH0_DOMAIN, // Replace with your Auth0 domain
      clientID: process.env.AUTH0_CLIENT_ID , // Replace with your Auth0 client ID
      clientSecret: process.env.AUTH0_CLIENT_SECRET, // Replace with your Auth0 client secret
      callbackURL: process.env.AUTH0_CALLBACK_URL, // Replace with your callback URL
      state: false
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any, done: Function) {
    return done(null, profile);
  }
}