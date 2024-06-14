import { ILogger } from '../domain/logger/logger.interface';
import {
  IJwtService,
  IJwtServicePayload,
} from '../domain/adapter/jwt.interface';
import { JWTConfig } from '../domain/config/jwt.interface';
import { UserRepository } from '../domain/repositories/userRepository.interface';
import { IBcryptService } from '../domain/adapter/bcrypt.interface';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JWTConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async getCookieWithJwtToken(userId: number) {
    this.logger.log(
      'LoginUseCases execute',
      `The user ${userId} have been logged.`,
    );
    const payload: IJwtServicePayload = { userId: userId };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
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
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    await this.setCurrentRefreshToken(token, userId);
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
    return cookie;
  }

  async validateUserForLocalStragtegy(userId: number, pass: string) {
    const user = await this.userRepository.getUserByUsername(userId);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(pass, user.password);
    if (user && match) {
      await this.updateLoginTime(user.id);
      const { password, ...result } = user;
      console.log(password);
      return result;
    }
    return null;
  }

  async validateUserForJWTStragtegy(userId: number) {
    const user = await this.userRepository.getUserByUsername(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async updateLoginTime(userId: number) {
    await this.userRepository.updateLastLogin(userId);
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken =
      await this.bcryptService.hash(refreshToken);
    await this.userRepository.updateRefreshToken(
      userId,
      currentHashedRefreshToken,
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.userRepository.getUserByUsername(userId);
    if (!user) {
      return null;
    }

    const isRefreshTokenMatching = await this.bcryptService.compare(
      refreshToken,
      user.hashRefreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }
}
