import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
//import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '@app/shared';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';

@Controller('autho')
export class AuthControllers {
  constructor(private readonly authService: AuthService) {}

  //@UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserInfoDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(user, response);
    user['token'] = token;
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
