import { JwtService } from '@nestjs/jwt';
import { IJwtService, IJwtServicePayload } from '@app/domain';
import { Injectable } from '@nestjs/common';
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
      const decoded = await this.jwtService.verifyAsync(token, { secret: this.jwtSecret});
      //console.log('');
      //console.log(decoded);
      return decoded; // Return decoded payload if token is valid
    } catch (error) {
      //console.log('### eror name------------');
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired'); // Handle token expiration separately
      }
      throw new Error('Token invalid'); // Handle other errors (e.g., invalid token)
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
