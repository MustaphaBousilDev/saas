import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTenantDto } from './tenant.dto';
import { Tenant } from './tenant.entity';
import { TenantsService } from './tenant.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    console.log('########### controller tanent');
    console.log(createTenantDto);
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  findAll(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }
}
