import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from './../src/auth.module';
import { LoginUseCases } from '../src/usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '../src/usecases/isAuthenticated.usecases';
import { UseCaseProxy } from '../src/infra/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../src/infra/usecases-proxy/usecases-proxy.module';
import { JwtAuthGuard } from '../src/guards/jwt-auth.guard';
import JwtRefreshGuard from '../src/infra/shared/guards/jwtRefresh.guard';
import cookieParser from 'cookie-parser';

describe('Testing Authentication Infrastructure Controller auth', () => {
  let app: INestApplication;
  let loginUseCase: LoginUseCases;
  let isAuthenticatedUseCases: IsAuthenticatedUseCases;
  beforeAll(async () => {
    loginUseCase = {} as LoginUseCases;
    loginUseCase.getCookieWithJwtToken = jest.fn();
    loginUseCase.getCookieWithJwtRefreshToken = jest.fn();
    loginUseCase.validateUserForLocalStragtegy = jest.fn();
    const loginUsecaseProxyService: UseCaseProxy<LoginUseCases> = {
      getInstance: () => loginUseCase,
    } as UseCaseProxy<LoginUseCases>;

    isAuthenticatedUseCases = {} as IsAuthenticatedUseCases;
    isAuthenticatedUseCases.execute = jest.fn();
    const isAuthUsecaseProxyService: UseCaseProxy<IsAuthenticatedUseCases> = {
      getInstance: () => isAuthenticatedUseCases,
    } as UseCaseProxy<IsAuthenticatedUseCases>;

    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
      .useValue(isAuthUsecaseProxyService)
      .overrideProvider(UsecasesProxyModule.LOGIN_USECASES_PROXY)
      .useValue(loginUsecaseProxyService)
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate(context: ExecutionContext) {
          const req = context.switchToHttp().getRequest();
          req.user = { userId: 1 };
          return (
            JSON.stringify(req.cookies) ===
            JSON.stringify({
              Authentication: '1234556',
              Path: '/',
              'Max-Age': '1800',
            })
          );
        },
      })
      .overrideGuard(JwtRefreshGuard)
      .useValue({
        canActivate(context: ExecutionContext) {
          const req = context.switchToHttp().getRequest();
          req.user = { userId: 1 };
          return true;
        },
      })
      .compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });
});
