import { LoggerService } from '@app/infra/logger/logger.service';
import { JwtTokenService } from '@app/infra/services/jwt/jwt.service';
import { EnvironmentConfigService } from '@app/infra/config/env/environment-config.service';
import { BcryptService } from '@app/infra/services/bcrypt/bcrypt.service';
import { RateLimiterService } from '@app/infra/services/rate/rate-limiter.service';
import { Injectable } from '@nestjs/common';
import { UserRepositorySQL } from '@app/infra/persistences';
@Injectable()
export class ProfileUseCases {
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

  async updateEmail() {}
  async changePassword() {}
  async updatePicture() {}
  async accountActivated() {}
  async updateProfile() {}
  async uploadPicture() {}
  async getPicture() {}
}
