import { IJwtServicePayload } from '@app/domain';
import { CurrentUser } from '@app/shared';
import { TENANT_HEADER } from '@app/shared/tenancy/tenancy.middleware';
import {
  IAMAllUseCases,
  IAMCreateInputDTO,
  IAMCreateOutputDTO,
  IAMCreateUseCases,
  IAMDeleteUseCases,
  IAMFilterDTO,
  IAMGetUseCases,
  IAMOutputAllDTO,
  IAMPatchUseCases,
  IAMUpdateUseCases,
} from '@app/useCases/iam';
import {
  PermissionCreateInputDTO,
  PermissionFilterDTO,
  PermissionUpdateInputDTO,
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
import { plainToClass } from 'class-transformer';
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
    const header = request.headers[TENANT_HEADER] as string;
    await this.iamCreate.rateLimiting(ip);
    //check user is exist in the resource_has_role_permission
    await this.iamCreate.checkUserIfExistinIAMResource(
      iamDTO.userId,
      `tenant_${header}`,
    );
    const create = await this.iamCreate.createIAM(iamDTO, user.userId);
    return IAMCreateOutputDTO.fromIAM(create);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getListIAM(@Request() request: any, @Query() filterDto: IAMFilterDTO) {
    const ip = request.ip;
    const header = request.headers[TENANT_HEADER] as string;
    await this.iamAll.rateLimiting(ip);
    const iamList = await this.iamAll.getAllIAM(
      filterDto,
      request,
      `tenant_${header}`,
    );
    const transformedData = iamList.map((user: any) => {
      return plainToClass(
        IAMOutputAllDTO,
        {
          user_id: user.user_id,
          roles: user.roles.map((role: any) => ({
            name: role.name,
            resources: role.resources.map((resource: any) => ({
              name: resource.name,
              permissions: resource.permissions.map((permission: any) => ({
                name: permission.name,
              })),
            })),
          })),
        },
        { excludeExtraneousValues: true },
      );
    });
    return transformedData;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:usr')
  async getIAMUser(@Param('usr') usr: number, @Request() request: any) {
    try {
      const ip = request.ip;
      const header = request.headers[TENANT_HEADER] as string;
      await this.iamGet.rateLimiting(ip);
      const result = await this.iamGet.getIAMUser(`tenant_${header}`, usr);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:iam')
  async deleteIAMUser(@Request() request: any, @Param('iam') iam: string) {
    const ip = request.ip;
    const header = request.headers[TENANT_HEADER] as string;
    await this.iamDelete.rateLimiting(ip);
  }
}
