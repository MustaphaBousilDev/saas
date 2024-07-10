import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtTokenService } from '@app/infra/services/jwt/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtTokenService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = this.extractTokenFromHeader(request);
      /*if (!token) {
        throw new UnauthorizedException('Token not found');
      }*/
      const payload = await this.jwtService.checkToken(token);
      request.user = payload;
      return true;
    } catch (error) {
      console.log('fucking error', error.message);
      if (
        error instanceof UnauthorizedException &&
        error.message === 'Token invalid'
      ) {
        console.log('tonen is expired, yesss bitch');
        const refreshToken = this.extractRefreshTokenFromHeader(request);
        if (!refreshToken) {
          throw new UnauthorizedException('Refresh token not found');
        }
        try {
          const newAccessToken =
            await this.jwtService.refreshToken(refreshToken);
          request.headers['Authorization'] = `${newAccessToken}`;
          const newPayload = await this.jwtService.checkToken(
            request.headers['Authorization'],
          );
          request.user = newPayload;
          return true;
        } catch {
          throw new UnauthorizedException('Invalid refresh tokendd');
        }
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader =
      request?.cookies?.Authentication || request?.Authentication;
    if (!authHeader) {
      return null;
    }

    //const [type, token] = authHeader.split(' ');
    return authHeader;
  }

  private extractRefreshTokenFromHeader(request: any): string | null {
    const refreshHeader = request?.cookies?.Refresh || request?.Refresh;
    if (!refreshHeader) {
      return null;
    }
    return refreshHeader;
  }
}
