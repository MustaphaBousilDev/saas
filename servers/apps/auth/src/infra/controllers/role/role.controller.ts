import { CurrentUser } from '@app/shared';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import {
  RoleAllUseCases,
  RoleCreateInputDTO,
  RoleCreateOutputDTO,
  RoleCreateUseCases,
  RoleDeleteUseCases,
  RoleFilterDTO,
  RoleFindOutputDTO,
  RoleGetUseCases,
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
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRole(
    @Request() request: any,
    @Body() roleDTO: RoleCreateInputDTO,
    @CurrentUser() user: UserInfoDto,
  ): Promise<RoleCreateOutputDTO> {
    const ip = request.ip;
    await this.roleCreate.rateLimiting(ip);
    await this.roleCreate.checkRoleByName(roleDTO.name);
    const roleResponse = await this.roleCreate.createRole(roleDTO, user._id);

    return new RoleCreateOutputDTO(roleResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:role')
  async getRole(@Param('role') role: string, @Request() request: any) {
    const ip = request.ip;
    await this.roleGet.rateLimiting(ip);
    const roleResponse = await this.roleGet.getRole(role);

    return new RoleFindOutputDTO(roleResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllRole(@Request() request: any, @Query() filterDto: RoleFilterDTO) {
    const ip = request.ip;
    await this.roleAll.rateLimiting(ip);
    const roles = await this.roleAll.getAllRoles(filterDto);

    return RoleGetAllOutputDTO.fromRoles(roles);
  }

  @Put('/:role')
  async updateRole() {}

  @Patch('/:role')
  async updatePartialRole() {}

  @Delete('/:role')
  async deleteRole() {}
}
