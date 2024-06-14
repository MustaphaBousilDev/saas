import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsecasesProxyModule } from '@app/infra/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@app/infra/usecases-proxy/usecases-proxy';
import { LoginUseCases } from 'apps/auth/src/usecases/login.usecases';
import { LoggerService } from '@app/infra/logger/logger.service';
import { ExceptionsService } from '@app/infra/exceptions/exceptions.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = this.loginUseCaseProxy
      .getInstance()
      .validateUserForJWTStragtegy(payload.id);
    if (!user) {
      this.logger.warn('JwtStrategy', 'User not found');
      this.exceptionService.UnauthorizedException({
        message: 'User not found',
      });
    }
    return user;
  }
}
