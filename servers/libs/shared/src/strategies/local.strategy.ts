import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UsecasesProxyModule } from '@app/infra/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@app/infra/usecases-proxy/usecases-proxy';
import { LoginUseCases } from 'apps/auth/src/usecases/login.usecases';
import { LoggerService } from '@app/infra/logger/logger.service';
import { ExceptionsService } from '@app/infra/exceptions/exceptions.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    console.log('###(------------------is coming here from shared folder');
    if (!email || !password) {
      this.logger.warn(
        'LocalStrategy',
        'Email or password is missing, BadRequestException',
      );
      this.exceptionService.UnauthorizedException();
    }
    const user = await this.loginUseCaseProxy
      .getInstance()
      .validateUserForLocalStragtegy(email, password);
    if (!user) {
      this.logger.warn('LocalStrategy', `Invalid email or password`);
      this.exceptionService.UnauthorizedException({
        message: 'Invalid email or password.',
      });
    }
    return user;
  }
}
