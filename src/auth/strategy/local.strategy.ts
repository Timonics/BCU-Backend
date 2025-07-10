import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, passowrd: string) {
    const validateUser = this.authService.validateUser(email, passowrd);
    if (!validateUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return validateUser;
  }
}
