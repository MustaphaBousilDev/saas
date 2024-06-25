import { CurrentUser } from '@app/shared';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import {
  RoleAllUseCases,
  RoleCreateInputDTO,
  RoleCreateOutputDTO,
  RoleCreateUseCases,
  RoleDeleteUseCases,
  RoleGetUseCases,
  RoleUpdateUseCases,
} from '@app/useCases/role';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
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
  @Post('')
  async createRole(
    @Request() request: any,
    @Body() roleDTO: RoleCreateInputDTO,
    @CurrentUser() user: UserInfoDto,
  ): Promise<RoleCreateOutputDTO> {
    console.log('role controller', roleDTO);
    const ip = request.ip;
    await this.roleCreate.rateLimiting(ip);
    console.log('ignore rate limiting');
    await this.roleCreate.checkRoleByName(roleDTO.name);
    const roleResponse = await this.roleCreate.createRole(roleDTO, user._id);

    return new RoleCreateOutputDTO(roleResponse);
  }

  @Get('/:role')
  async getRole() {}

  @Get()
  async getAllRole() {}

  @Put('/:role')
  async updateRole() {}

  @Patch('/:role')
  async updatePartialRole() {}

  @Delete('/:role')
  async deleteRole() {}
}
