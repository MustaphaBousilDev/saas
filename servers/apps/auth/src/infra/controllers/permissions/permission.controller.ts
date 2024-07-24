import { IJwtServicePayload } from '@app/domain';
import { CurrentUser } from '@app/shared';
import {
  PermissionAllUseCases,
  PermissionCreateInputDTO,
  PermissionCreateOutputDTO,
  PermissionCreateUseCases,
  PermissionDeleteOutputDTO,
  PermissionDeleteUseCases,
  PermissionFilterDTO,
  PermissionFindOutputDTO,
  PermissionGetAllOutputDTO,
  PermissionGetUseCases,
  PermissionPatchUseCases,
  PermissionUpdateInputDTO,
  PermissionUpdateOutputDTO,
  PermissionUpdateUseCases,
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
@Controller('api/v1/iam/permission')
export class PermissionController {
  constructor(
    private readonly permissionAll: PermissionAllUseCases,
    private readonly permissionCreate: PermissionCreateUseCases,
    private readonly permissionDelete: PermissionDeleteUseCases,
    private readonly permissionGet: PermissionGetUseCases,
    private readonly permissionUpdate: PermissionUpdateUseCases,
    private readonly permissionPatch: PermissionPatchUseCases,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPermission(
    @Request() request: any,
    @Body() permissionDTO: PermissionCreateInputDTO,
    @CurrentUser() user: IJwtServicePayload,
  ): Promise<PermissionCreateOutputDTO> {
    const ip = request.ip;
    await this.permissionCreate.rateLimiting(ip);
    await this.permissionCreate.checkPermissionByName(permissionDTO.name);
    const roleResponse = await this.permissionCreate.createPermission(
      permissionDTO,
      user.userId,
    );

    return new PermissionCreateOutputDTO(roleResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:permission')
  async getPermission(
    @Param('permission') permission: string,
    @Request() request: any,
  ) {
    try {
      const ip = request.ip;
      await this.permissionGet.rateLimiting(ip);
      const roleResponse = await this.permissionGet.getPermission(permission);

      return new PermissionFindOutputDTO(roleResponse);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPermission(
    @Request() request: any,
    @Query() filterDto: PermissionFilterDTO,
  ) {
    const ip = request.ip;
    await this.permissionAll.rateLimiting(ip);
    const permissions = await this.permissionAll.getAllPermissions(filterDto);

    return PermissionGetAllOutputDTO.fromPermission(permissions);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:permission')
  async updatePermission(
    @Request() request: any,
    @Body() permissionDTO: PermissionCreateInputDTO,
    @CurrentUser() user: any,
    @Param('permission') permission: string,
  ) {
    const ip = request.ip;
    await this.permissionUpdate.rateLimiting(ip);
    await this.permissionUpdate.checkPermissionByName(permissionDTO.name);
    await this.permissionUpdate.updatePermission(
      permission,
      user.userId,
      permissionDTO,
    );
    const newPermission = await this.permissionUpdate.verifyPermissionByName(
      permissionDTO.name,
    );
    return new PermissionUpdateOutputDTO(newPermission);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:permission')
  async updatePartialPermission(
    @Request() request: any,
    @Body() permissionDTO: PermissionUpdateInputDTO,
    @CurrentUser() user: any,
    @Param('permission') permission: string,
  ) {
    const ip = request.ip;
    await this.permissionPatch.rateLimiting(ip);
    if (permissionDTO.name) {
      await this.permissionPatch.checkPermissionByName(permissionDTO.name);
    }
    await this.permissionPatch.updatePermission(
      permission,
      user.userId,
      permissionDTO,
    );
    if (permissionDTO.name) {
      const newPermission = await this.permissionPatch.verifyPermissionByName(
        permissionDTO.name,
      );
      return new PermissionUpdateOutputDTO(newPermission);
    }
    return 'Success Update Partial';
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:permission')
  async deletePermission(
    @Request() request: any,
    @Param('permission') permission: string,
  ) {
    const ip = request.ip;
    await this.permissionDelete.rateLimiting(ip);
    const permissionInfo =
      await this.permissionDelete.checkPermission(permission);
    await this.permissionDelete.deletePermission(permission);
    return new PermissionDeleteOutputDTO(permissionInfo);
  }
}
