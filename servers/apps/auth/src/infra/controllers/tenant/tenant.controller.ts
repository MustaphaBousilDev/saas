import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTenantDto } from '../../../usecases/tenant/tenant.dto';
import { Tenant } from '../../persistences/entities/tenant.entity';
import { TenantsService } from '../../../usecases/tenant/tenant.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    console.log(createTenantDto);
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  findAll(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }
}
