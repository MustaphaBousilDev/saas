import { CurrentUser } from '@app/shared';
import { LoginUseCases } from '@app/useCases/auth/login.usecases';
import { LogoutUseCases } from '@app/useCases/auth/logout.usecases';
import { RegisterUseCases } from '@app/useCases/auth/register.usecases';
import {
  Body,
  Controller,
  Delete,
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
export class PolicyController {
  constructor(
    private readonly loginUseCase: LoginUseCases,
    private readonly registerUseCase: RegisterUseCases,
    private readonly logoutUseCase: LogoutUseCases,
  ) {}

  @Get()
  async getAllPolicy() {}

  @Get()
  async getPolicy() {}

  @Post()
  async createPolicy() {}

  @Patch('/:user')
  async updatePartialPolicy() {}

  @Put('/:user')
  async updatePolicy() {}

  @Delete()
  async deletePolicy() {}

  @Patch()
  async softDeletePolicy() {}
}
