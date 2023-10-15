// auth0.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-auth0';
import { AuthService } from './auth.service'; // Create your AuthService

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(private readonly authService: AuthService) {
    super({
      domain: process.env.AUTH0_DOMAIN, // Replace with your Auth0 domain
      clientID: 'your-auth0-client-id', // Replace with your Auth0 client ID
      clientSecret: 'your-auth0-client-secret', // Replace with your Auth0 client secret
      callbackURL: 'http://localhost:3000/callback', // Replace with your callback URL
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // Add custom validation logic here, e.g., checking if the user exists
    return this.authService.validateUser(profile);
  }
}
