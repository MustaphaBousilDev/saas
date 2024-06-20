import { CurrentUser } from '@app/shared';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { LoginUseCases } from '@app/useCases/auth/login.usecases';
import { LogoutUseCases } from '@app/useCases/auth/logout.usecases';
import { RegisterUseCases } from '@app/useCases/auth/register.usecases';
import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { RegisterDTO } from './dto';
import { LocalAuthGuard } from 'apps/auth/src/guards/local-auth.guard';
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCases,
    private readonly registerUseCase: RegisterUseCases,
    private readonly logoutUseCase: LogoutUseCases,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @CurrentUser() user: UserInfoDto,
    @Request() request: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const ip = request.ip;
    await this.loginUseCase.rateLimiting(ip);
    const accessTokenCookie = await this.loginUseCase.getCookieWithJwtToken(
      user._id,
    );
    const refreshTokenCookie =
      await this.loginUseCase.getCookieWithJwtRefreshToken(user._id);
    response.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie.cookie,
    ]);
    await this.loginUseCase.setCurrentRefreshTokenDB(
      refreshTokenCookie.token,
      user._id,
    );
    return 'Login successful';
  }

  @Post('/register')
  async register(
    @Body() registerDTO: RegisterDTO,
    @Request() request: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('register', registerDTO);
    const ip = request.ip;
    await this.registerUseCase.rateLimiting(ip);
    const response = await this.registerUseCase.registerUser(registerDTO);
    const accessTokenCookie = await this.registerUseCase.getCookieWithJwtToken(
      response.user._id,
    );
    const refreshTokenCookie =
      await this.registerUseCase.getCookieWithJwtRefreshToken(
        response.user._id,
      );
    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie.cookie]);
    await this.registerUseCase.setCurrentRefreshTokenDB(
      refreshTokenCookie.token,
      response.user._id,
    );
    return 'Register succesful';
  }
  @Post('/logout')
  //@UseGuards(JwtAuthGuard)
  async logout(
    @Request() request: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookie = await this.logoutUseCase.execute();
    res.setHeader('Set-Cookie', cookie);
    return 'Logout Successful';
  }
}
