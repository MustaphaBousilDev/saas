import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentConfigService } from '@app/infra/config/env/environment-config.service';
import { UsecasesProxyModule } from '@app/infra/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@app/infra/usecases-proxy/usecases-proxy';
import { LoginUseCases } from 'apps/auth/src/usecases/login.usecases';
import { LoggerService } from '@app/infra/logger/logger.service';
import { ExceptionsService } from '@app/infra/exceptions/exceptions.service';
import { Request } from 'express';
import { TokenPayload } from '@app/domain';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: EnvironmentConfigService,
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.getJwtRefreshSecret(),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request.cookies?.Refresh;
    const user = this.loginUseCaseProxy
      .getInstance()
      .getUserIfRefreshTokenMatches(refreshToken, payload.userId);
    if (!user) {
      this.logger.warn('JWTStrategy', 'User not found or hash not correct');
      this.exceptionService.UnauthorizedException({
        message: 'User not found or hash not correct',
      });
    }
    return user;
  }
}
