import { IJwtServicePayload } from '@app/domain';
import { UserAuth } from '../../infra/persistences/entities/user.entity';
import { UserDetailAuth } from '@app/auth-entity';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LoggerService } from '@app/infra/logger/logger.service';
import { JwtTokenService } from '@app/infra/services/jwt/jwt.service';
import { EnvironmentConfigService } from '@app/infra/config/env/environment-config.service';
import { BcryptService } from '@app/infra/services/bcrypt/bcrypt.service';
import { UserRepositorySQL } from '@app/infra/persistences';
import { UserDetailsRepositorySQL } from '@app/infra/persistences';
import { RegisterDTO } from './dtos';

@Injectable()
export class VerifyUseCases {
  constructor(
    private readonly logger: LoggerService,
    private readonly bcryptService: BcryptService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly jwtConfig: EnvironmentConfigService,
    private readonly userRepository: UserRepositorySQL,
    private readonly userDetailsRepository: UserDetailsRepositorySQL,
    private readonly rateLimiter: RateLimiterService,
  ) {}
  private async printCurrentSchema(dataSource: DataSource): Promise<void> {
    try {
      const result = await dataSource.query(`
          SELECT current_schema(), current_setting('search_path');`);
    } catch (error) {
      console.error('Error fetching current schema information:', error);
    }
  }
  async rateLimiting(ip: string) {
    const allowed = await this.rateLimiter.consume(ip);
    if (allowed) {
      //console.log('this route is rate limited Register (Success)');
      return 'This route is rate limeted ';
    } else {
      throw new BadRequestException('rate limited exceeded Register (Failed)');
    }
  }
  async getCookieWithJwtToken(userId: number) {
    this.logger.log(
      'RegisterUseCases execute',
      `The user "${userId}" is create account and have be autumatecl logged.`,
    );
    const payload: IJwtServicePayload = { userId: userId };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return `Authentication=${token}; HttpOnly;  Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  }
  async getCookieWithJwtRefreshToken(userId: number) {
    this.logger.log(
      'RegisterUseCases execute and will create refreshToken',
      `The user "${userId}" is create account and have be autumatecl logged.`,
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
  async registerUser(UserDto: RegisterDTO) {
    //hash password
    const password = UserDto.password;
    const hashedPassword = await this.bcryptService.hash(password);
    //create User Details first
    const createUserDetails = new UserDetailAuth({
      firstName: UserDto.firstName,
      lastName: UserDto.lastName,
      phone: UserDto.phone,
    });
    const userDetails =
      await this.userDetailsRepository.create(createUserDetails);
    const user = new UserAuth({
      ...UserDto,
      password: hashedPassword,
      username: UserDto.firstName + UserDto.lastName,
      userDetails: userDetails,
    });
    await this.userRepository.create(user);
    //await this.registersRepository.save(user);
    this.logger.log(
      'RegisterUseCase Success',
      `User ${UserDto.firstName} has been registered.`,
    );
    return {
      message: 'Success Register User.',
      user: user,
    };
  }
  async setCurrentRefreshTokenDB(refreshToken: string, userId: number) {
    const currentHashedRefreshToken =
      await this.bcryptService.hash(refreshToken);
    await this.userRepository.findOneAndUpdate(
      { _id: userId },
      { refreshToken: currentHashedRefreshToken },
    );
  }
}
