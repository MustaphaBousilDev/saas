import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtTokenService } from '../services/jwt/jwt.service'; // Adjust the import path as necessary

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['Authentication'];
    //console.log('|---------------------- token in middleware---------------|');
    //console.log(token);
    //console.log('|---------------------------------------------------------|');
    if (token) {
      try {
        const decoded = await this.jwtTokenService.checkToken(token);
        console.log('decode:', decoded);
        const issuedAt = new Date(decoded.iat * 1000);
        const expiresAt = new Date(decoded.exp * 1000);

        console.log('Issued At:', issuedAt);
        console.log('Expires At:', expiresAt);
        // Token is valid, user is logged in
        return res.status(403).json({ message: 'User is already logged in' });
      } catch (err) {
        if (
          err.message === 'Token expired' ||
          err.message === 'Token invalid'
        ) {
          // Token is invalid or expired, allow to proceed
          next();
        }
      }
    } else {
      // No token present, allow to proceed
      next();
    }
  }
}
