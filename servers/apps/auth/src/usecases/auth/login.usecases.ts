import { IJwtServicePayload } from '../../domain/adapter/jwt.interface';
import { LoggerService } from '@app/infra/logger/logger.service';
import { JwtTokenService } from '@app/infra/services/jwt/jwt.service';
import { EnvironmentConfigService } from '@app/infra/config/env/environment-config.service';
import { BcryptService } from '@app/infra/services/bcrypt/bcrypt.service';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositorySQL } from '@app/infra/persistences';
import { LoginDTO } from './dtos';

@Injectable()
export class LoginUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly jwtConfig: EnvironmentConfigService,
    private readonly userRepository: UserRepositorySQL,
    private readonly bcryptService: BcryptService,
    private readonly rateLimiter: RateLimiterService,
  ) {}

  async rateLimiting(ip: string) {
    const allowed = await this.rateLimiter.consume(ip);
    if (allowed) {
      return 'This route is rate limited';
    } else {
      return 'Rate limit exceeded';
    }
  }
  async getCookieWithJwtToken(userId: number) {
    this.logger.log(
      'LoginUseCases execute',
      `The user ${userId} have been logged.`,
    );
    const payload: IJwtServicePayload = { userId: userId };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = await this.jwtTokenService.createToken(
      payload,
      secret,
      expiresIn,
    );
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  }

  async getCookieWithJwtRefreshToken(userId: number) {
    this.logger.log(
      'LoginUseCases execute',
      `The user ${userId} have been logged.`,
    );
    const payload: IJwtServicePayload = { userId: userId };
    const secret = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    const token = await this.jwtTokenService.createToken(
      payload,
      secret,
      expiresIn,
    );
    await this.setCurrentRefreshTokenDB(token, userId);
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
    return {
      cookie: cookie,
      token: token,
    };
  }

  async validateUserForLocalStragtegy(loginDto: LoginDTO) {
    const user = await this.userRepository.findOne({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const match = await this.bcryptService.compare(
      loginDto.password,
      user.password,
    );
    if (user && match) {
      //await this.updateLoginTime(user._id);
      const { password, ...result } = user;
      return result;
    }
    //return 'Email or Password Incorrect';
    return false;
  }

  async validateUserForJWTStragtegy(userId: number) {
    const user = await this.userRepository.findOne({ _id: userId });
    if (!user) {
      return null;
    }
    this.logger.log(
      'User is Really Logged',
      `The user ${user._id} have been logged.`,
    );
    return user;
  }

  async updateLoginTime(userId: number) {
    /*wait this.userRepository.updateLastLogin(userId);*/
  }

  async setCurrentRefreshTokenDB(refreshToken: string, userId: number) {
    const currentHashedRefreshToken =
      await this.bcryptService.hash(refreshToken);
    await this.userRepository.findOneAndUpdate(
      { _id: userId },
      { refreshToken: currentHashedRefreshToken },
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    /*const user = await this.userRepository.getUserByUsername(userId);
    if (!user) {
      return null;
    }*/

    /*const isRefreshTokenMatching = await this.bcryptService.compare(
      refreshToken,
      user.hashRefreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    }*/

    return null;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({ _id: id });
    if (!user) {
      return null;
    }
    this.logger.log(
      'User is Exists in the database',
      `The user ${user._id} have been finding.`,
    );
    return user;
  }
}
