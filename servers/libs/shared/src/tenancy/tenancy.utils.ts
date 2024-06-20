import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as tenantsOrmconfig from './orm.config';
import { join } from 'path';
import {
  AccountLockOut,
  FailedLoginAttempts,
  LoginAttempts,
  PasswordHistory,
  PasswordPolicy,
  PasswordResetToken,
  Permission,
  Policies,
  Resource,
  Role,
  Role_Has_Resource_Permission,
  UserAuth,
  UserDetailAuth,
  VerificationEmailLogs,
} from '@app/infra/entities';

const connectionManager: Map<string, DataSource> = new Map();

const ormCongf = {
  ...tenantsOrmconfig,
  entities: [join(__dirname, './modules/tenanted/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/tenanted/*{.ts,.js}')],
};

export async function getTenantConnection(
  tenantId: string,
): Promise<DataSource> {
  const connectionName = `tenant_${tenantId}`;
  if (connectionManager.has(connectionName)) {
    const existingDataSource = connectionManager.get(connectionName);
    if (existingDataSource && existingDataSource.isInitialized) {
      return existingDataSource;
    }
    if (existingDataSource) {
      await existingDataSource.initialize();
      return existingDataSource;
    }
  }

  const tenantConfig: PostgresConnectionOptions = {
    ...(ormCongf as unknown as PostgresConnectionOptions),
    name: connectionName,
    schema: connectionName,
    entities: [
      UserAuth,
      AccountLockOut,
      VerificationEmailLogs,
      LoginAttempts,
      PasswordHistory,
      PasswordPolicy,
      PasswordResetToken,
      Permission,
      Policies,
      Role,
      UserDetailAuth,
      FailedLoginAttempts,
      Resource,
      Role_Has_Resource_Permission,
    ],
  };

  const newDataSource = new DataSource(tenantConfig);
  await newDataSource.initialize();
  connectionManager.set(connectionName, newDataSource);

  return newDataSource;
}
