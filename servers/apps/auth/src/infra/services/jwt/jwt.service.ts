import { JwtService } from '@nestjs/jwt';
import { IJwtService, IJwtServicePayload } from '@app/domain';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService implements IJwtService {
  private readonly jwtSecret: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  async checkToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });
      return decoded; // Return decoded payload if token is valid
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired'); // Handle token expiration separately
      }
      throw new UnauthorizedException('Token invalid'); // Handle other errors (e.g., invalid token)
    }
  }

  async refreshToken(refreshToken: string): Promise<string> {
    console.log('refresh Token', refreshToken);
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      console.log('paylodddd');
      console.log(payload);
      const newAccessToken = await this.jwtService.sign(
        { userId: payload.userId },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
        },
      );
      return newAccessToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
