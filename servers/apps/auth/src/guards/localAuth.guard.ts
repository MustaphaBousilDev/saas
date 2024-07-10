import { LoginDTO } from '@app/useCases/auth/dtos';
import { LoginUseCases } from '@app/useCases/auth/login.usecases';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly authService: LoginUseCases) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    //const { email, password } = request.body;
    const loginDto = plainToInstance(LoginDTO, request.body);
    const errors = await validate(loginDto);

    if (errors.length > 0) {
      throw new UnauthorizedException('Validation failed');
    }

    const user = await this.authService.validateUserForLocalStragtegy(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    request.user = user;
    return true;
  }
}
