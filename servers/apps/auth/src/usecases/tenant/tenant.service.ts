import { Injectable } from '@nestjs/common';
import { getTenantConnection } from '@app/shared/tenancy/tenancy.utils';
import { Tenant } from '../../infra/persistences/entities/tenant.entity';
import { CreateTenantDto } from './tenant.dto';
import { TenantRepositorySQL } from '../../infra/persistences/repositories/tenant.repository';
import { createDataSource } from '@app/shared/database/database.providers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TenantsService {
  constructor(
    private readonly tenantsRepository: TenantRepositorySQL,
    private readonly configService: ConfigService,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    //console.log('########### service tanent');
    let tenant = new Tenant({
      ...createTenantDto,
    });

    tenant = await this.tenantsRepository.create(tenant);
    console.log('success');
    console.log(tenant);
    const dataSource = createDataSource(this.configService);
    if (!dataSource.isInitialized) {
      console.log('yoyoyoy');
      await dataSource.initialize();
    }
    // Run migrations
    await dataSource.runMigrations();
    const schemaName = `tenant_${tenant._id}`;
    console.log('');
    await dataSource.manager.query(`
    CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

    const connection = await getTenantConnection(`${tenant._id}`);
    if (connection) {
      console.log('success connection hh with new DataSource');
    }
    await connection.runMigrations();
    await connection.destroy();
    return tenant;
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantsRepository.find({});
  }
}
