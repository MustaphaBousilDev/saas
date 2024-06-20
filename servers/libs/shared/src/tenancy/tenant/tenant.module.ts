import { Module } from '@nestjs/common';
import { Tenant } from './tenant.entity';

import { TenantsController } from './tenant.controller';
import { TenantsService } from './tenant.service';
import { DatabaseModulemySQL } from '@app/shared/database';
import { TenantRepositorySQL } from './tenant.repository';

@Module({
  imports: [DatabaseModulemySQL, DatabaseModulemySQL.forFeature([Tenant])],
  providers: [TenantsService, TenantRepositorySQL],
  controllers: [TenantsController],
})
export class TenantsModule {}
