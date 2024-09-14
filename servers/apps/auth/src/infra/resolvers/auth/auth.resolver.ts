import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserAuth } from '@app/auth-entity';
import { Inject, UseGuards } from '@nestjs/common';
//import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
//import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '@app/useCases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '@app/useCases/isAuthenticated.usecases';
import { RegisterDTO } from './dto/auth.dto';

@Resolver(() => UserAuth)
export class AuthResolver {
  constructor(
    /*@Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUseCaseProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUseCaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,*/
  ) {}

  @Mutation(() => UserAuth)
  register(
    @Args('registerInput')
    userDto: RegisterDTO,
  ) {}
}
