import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
//import { UsersService } from '../users/users.service';
import { LoginUseCases } from '@app/useCases/auth/login.usecases';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: LoginUseCases) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    // console.log('##---- verify user', email, password);
    try {
      return await this.usersService.validateUserForLocalStragtegy(
        email,
        password,
      );
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
