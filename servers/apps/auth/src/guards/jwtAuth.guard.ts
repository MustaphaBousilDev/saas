import { LoginUseCases } from '@app/useCases/auth/login.usecases';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtTokenService } from '@app/infra/services/jwt/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly useCasesLogin: LoginUseCases,
    private readonly jwtService: JwtTokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('can activate', token);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      const payload = await this.jwtService.checkToken(token);
      request.user = payload;
      console.log('payload', payload);
    } catch {
      throw new UnauthorizedException('Invalid Token');
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | null {
    console.log('request', request.cookies.Authentication);
    const authHeader =
      request?.cookies?.Authentication || request?.Authentication;
    console.log(authHeader, 'rrr');
    if (!authHeader) {
      return null;
    }

    //const [type, token] = authHeader.split(' ');
    return authHeader;
  }
}
