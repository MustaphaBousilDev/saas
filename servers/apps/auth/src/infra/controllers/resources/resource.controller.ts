import { IJwtServicePayload } from '@app/domain';
import { CurrentUser } from '@app/shared';
import {
  ResourceAllUseCases,
  ResourceCreateInputDTO,
  ResourceCreateOutputDTO,
  ResourceCreateUseCases,
  ResourceDeleteOutputDTO,
  ResourceDeleteUseCases,
  ResourceFilterDTO,
  ResourceFindOutputDTO,
  ResourceGetAllOutputDTO,
  ResourceGetUseCases,
  ResourcePatchUseCases,
  ResourceUpdateInputDTO,
  ResourceUpdateOutputDTO,
  ResourceUpdateUseCases,
} from '@app/useCases/resource';
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
@Controller('api/v1/iam/resource')
export class ResourceController {
  constructor(
    private readonly resourceAll: ResourceAllUseCases,
    private readonly resourceCreate: ResourceCreateUseCases,
    private readonly resourceDelete: ResourceDeleteUseCases,
    private readonly resourceGet: ResourceGetUseCases,
    private readonly resourceUpdate: ResourceUpdateUseCases,
    private readonly resourcePatch: ResourcePatchUseCases,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createResource(
    @Request() request: any,
    @Body() resourceDTO: ResourceCreateInputDTO,
    @CurrentUser() user: IJwtServicePayload,
  ): Promise<ResourceCreateOutputDTO> {
    const ip = request.ip;
    await this.resourceCreate.rateLimiting(ip);
    await this.resourceCreate.checkResourceByName(resourceDTO.name);
    const resourceResponse = await this.resourceCreate.createResouce(
      resourceDTO,
      user.userId,
    );

    return new ResourceCreateOutputDTO(resourceResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:resource')
  async getResource(
    @Param('resource') resource: string,
    @Request() request: any,
  ) {
    try {
      const ip = request.ip;
      await this.resourceGet.rateLimiting(ip);
      const resourceResponse = await this.resourceGet.getResource(resource);

      return new ResourceFindOutputDTO(resourceResponse);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllResource(
    @Request() request: any,
    @Query() filterDto: ResourceFilterDTO,
  ) {
    const ip = request.ip;
    await this.resourceAll.rateLimiting(ip);
    const resources = await this.resourceAll.getAllResource(filterDto);

    return ResourceGetAllOutputDTO.fromResource(resources);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:resource')
  async updateResource(
    @Request() request: any,
    @Body() resourceDTO: ResourceCreateInputDTO,
    @CurrentUser() user: any,
    @Param('resource') resource: string,
  ) {
    const ip = request.ip;
    await this.resourceUpdate.rateLimiting(ip);
    await this.resourceUpdate.checkResourceByName(resourceDTO.name);
    await this.resourceUpdate.updateResource(
      resource,
      user.userId,
      resourceDTO,
    );
    const newResource = await this.resourceUpdate.verifyResourceByName(
      resourceDTO.name,
    );
    return new ResourceUpdateOutputDTO(newResource);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:resource')
  async updatePartialResource(
    @Request() request: any,
    @Body() resourceDTO: ResourceUpdateInputDTO,
    @CurrentUser() user: any,
    @Param('resource') resource: string,
  ) {
    const ip = request.ip;
    await this.resourcePatch.rateLimiting(ip);
    if (resourceDTO.name) {
      await this.resourcePatch.checkResourceByName(resourceDTO.name);
    }
    await this.resourcePatch.updateResource(resource, user.userId, resourceDTO);
    if (resourceDTO.name) {
      const newResource = await this.resourcePatch.verifyResourceByName(
        resourceDTO.name,
      );
      return new ResourceUpdateOutputDTO(newResource);
    }
    return 'Success Update Partial';
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:resource')
  async deleteResource(
    @Request() request: any,
    @Param('resource') resource: string,
  ) {
    const ip = request.ip;
    await this.resourceDelete.rateLimiting(ip);
    const resourceInfo = await this.resourceDelete.checkResource(resource);
    await this.resourceDelete.deleteResource(resource);
    return new ResourceDeleteOutputDTO(resourceInfo);
  }
}
