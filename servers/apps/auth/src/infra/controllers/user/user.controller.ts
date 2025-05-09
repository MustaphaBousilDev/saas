import { CurrentUser } from '@app/shared';
import { LoginUseCases } from '@app/useCases/auth/login.usecases';
import { LogoutUseCases } from '@app/useCases/auth/logout.usecases';
import { RegisterUseCases } from '@app/useCases/auth/register.usecases';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from '../../../guards/localAuth.guard';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwtAuth.guard';
import { LoginResponseDTO, RegisterDTO } from '@app/useCases/auth/dtos';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
@Controller('api/v1/iam/users')
export class UserController {
  constructor(
    private readonly loginUseCase: LoginUseCases,
    private readonly registerUseCase: RegisterUseCases,
    private readonly logoutUseCase: LogoutUseCases,
  ) {}

  @Get()
  async getAllUser() {}

  @Patch('/:user')
  async updayeEmail() {}

  @Patch('/:changePassword')
  async changePassword() {}

  @Patch('/:updatePicture')
  async updatePicture() {}

  @Patch('/:activated')
  async activateAccount() {}

  @Put('/:profile')
  async updateProfile() {}

  @Get('/:picture')
  async getPicture() {}
}
