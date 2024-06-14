import { JwtService } from '@nestjs/jwt';
import { IJwtService, IJwtServicePayload } from '@app/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      console.log('');
      console.log(decoded);
      return decoded; // Return decoded payload if token is valid
    } catch (error) {
      console.log('### eror name------------');
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired'); // Handle token expiration separately
      }
      throw new Error('Token invalid'); // Handle other errors (e.g., invalid token)
    }
  }

  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
