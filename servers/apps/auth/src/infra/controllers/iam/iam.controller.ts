import { IJwtServicePayload } from '@app/domain';
import { CurrentUser } from '@app/shared';
import {
  IAMAllUseCases,
  IAMCreateInputDTO,
  IAMCreateOutputDTO,
  IAMCreateUseCases,
  IAMDeleteUseCases,
  IAMGetUseCases,
  IAMPatchUseCases,
  IAMUpdateUseCases,
} from '@app/useCases/iam';
import {
  PermissionCreateInputDTO,
  PermissionCreateOutputDTO,
  PermissionDeleteOutputDTO,
  PermissionFilterDTO,
  PermissionFindOutputDTO,
  PermissionGetAllOutputDTO,
  PermissionUpdateInputDTO,
  PermissionUpdateOutputDTO,
} from '@app/useCases/permission';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Request,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwtAuth.guard';
@Controller('api/v1/iam')
export class IAMController {
  constructor(
    private readonly iamAll: IAMAllUseCases,
    private readonly iamCreate: IAMCreateUseCases,
    private readonly iamDelete: IAMDeleteUseCases,
    private readonly iamGet: IAMGetUseCases,
    private readonly iamUpdate: IAMUpdateUseCases,
    private readonly iamPatch: IAMPatchUseCases,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createIAM(
    @Request() request: any,
    @Body() iamDTO: IAMCreateInputDTO,
    @CurrentUser() user: IJwtServicePayload,
  ): Promise<IAMCreateOutputDTO | any> {
    const ip = request.ip;
    await this.iamCreate.rateLimiting(ip);
    const create = await this.iamCreate.createIAM(iamDTO, user.userId);
    return IAMCreateOutputDTO.fromIAM(create);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:iam')
  async getPermission(
    @Param('permission') permission: string,
    @Request() request: any,
  ) {
    console.log('permission', permission);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPermission(
    @Request() request: any,
    @Query() filterDto: PermissionFilterDTO,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:iam')
  async updatePermission(
    @Request() request: any,
    @Body() permissionDTO: PermissionCreateInputDTO,
    @CurrentUser() user: any,
    @Param('permission') permission: string,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:iam')
  async updatePartialPermission(
    @Request() request: any,
    @Body() permissionDTO: PermissionUpdateInputDTO,
    @CurrentUser() user: any,
    @Param('permission') permission: string,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:iam')
  async deletePermission(
    @Request() request: any,
    @Param('permission') permission: string,
  ) {
  }
}
