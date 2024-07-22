import { IJwtServicePayload } from '@app/domain';
import { CurrentUser } from '@app/shared';
import {
  RoleAllUseCases,
  RoleCreateInputDTO,
  RoleCreateOutputDTO,
  RoleCreateUseCases,
  RoleDeleteOutputDTO,
  RoleDeleteUseCases,
  RoleFilterDTO,
  RoleFindOutputDTO,
  RoleGetUseCases,
  RolePatchUseCases,
  RoleUpdateInputDTO,
  RoleUpdateOutputDTO,
  RoleUpdateUseCases,
} from '@app/useCases/role';
import { RoleGetAllOutputDTO } from '@app/useCases/role';
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
@Controller('api/v1/iam/role')
export class RoleController {
  constructor(
    private readonly roleAll: RoleAllUseCases,
    private readonly roleCreate: RoleCreateUseCases,
    private readonly roleDelete: RoleDeleteUseCases,
    private readonly roleGet: RoleGetUseCases,
    private readonly roleUpdate: RoleUpdateUseCases,
    private readonly rolePatch: RolePatchUseCases,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRole(
    @Request() request: any,
    @Body() roleDTO: RoleCreateInputDTO,
    @CurrentUser() user: IJwtServicePayload,
  ): Promise<RoleCreateOutputDTO> {
    const ip = request.ip;
    console.log('roleDTO', roleDTO);
    await this.roleCreate.rateLimiting(ip);
    const role = await this.roleCreate.checkRoleByName(roleDTO.name);
    console.log('check role by name', role);
    const roleResponse = await this.roleCreate.createRole(roleDTO, user.userId);

    return new RoleCreateOutputDTO(roleResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:role')
  async getRole(@Param('role') role: string, @Request() request: any) {
    try {
      const ip = request.ip;
      await this.roleGet.rateLimiting(ip);
      const roleResponse = await this.roleGet.getRole(role);

      return new RoleFindOutputDTO(roleResponse);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllRole(@Request() request: any, @Query() filterDto: RoleFilterDTO) {
    const ip = request.ip;
    await this.roleAll.rateLimiting(ip);
    const roles = await this.roleAll.getAllRoles(filterDto);

    return RoleGetAllOutputDTO.fromRoles(roles);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:role')
  async updateRole(
    @Request() request: any,
    @Body() roleDTO: RoleCreateInputDTO,
    @CurrentUser() user: any,
    @Param('role') role: string,
  ) {
    const ip = request.ip;
    await this.roleUpdate.rateLimiting(ip);
    await this.roleUpdate.checkRoleByName(roleDTO.name);
    await this.roleUpdate.updateRole(role, user.userId, roleDTO);
    const newRole = await this.roleUpdate.verifyRoleByName(roleDTO.name);
    return new RoleUpdateOutputDTO(newRole);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:role')
  async updatePartialRole(
    @Request() request: any,
    @Body() roleDTO: RoleUpdateInputDTO,
    @CurrentUser() user: any,
    @Param('role') role: string,
  ) {
    const ip = request.ip;
    await this.rolePatch.rateLimiting(ip);
    if (roleDTO.name) {
      await this.rolePatch.checkRoleByName(roleDTO.name);
    }
    await this.rolePatch.updateRole(role, user.userId, roleDTO);
    if (roleDTO.name) {
      const newRole = await this.rolePatch.verifyRoleByName(roleDTO.name);
      return new RoleUpdateOutputDTO(newRole);
    }
    return 'Success Update Partial';
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:role')
  async deleteRole(@Request() request: any, @Param('role') role: string) {
    const ip = request.ip;
    await this.roleDelete.rateLimiting(ip);
    const roleInfo = await this.roleDelete.checkRole(role);
    await this.roleDelete.deleteRole(role);
    return new RoleDeleteOutputDTO(roleInfo);
  }
}
