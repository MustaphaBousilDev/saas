import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/config/database.interface';
import { JWTConfig } from '@app/domain';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig {
  constructor(private configService: ConfigService) {}

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }

  //#########################################
  get__POSTGRE_USER(): string {
    return this.configService.get<string>('POSTGRES_USER');
  }
  get__PASSWORD_USER(): string {
    return this.configService.get<string>('POSTGRES_PASSWORD');
  }
  get__PORT_POSTGRES(): number {
    return this.configService.get<number>('POSTGRES_PORT');
  }
  get__HOST_LOCAL(): string {
    return this.configService.get<string>('POSTGRES_HOST_LOCAL_PROJECT');
  }
  get__HOST_DOCKER(): string {
    return this.configService.get<string>('POSTGRES_HOST_DOCKER');
  }
  get__DB_PG(): string {
    return this.configService.get<string>('POSTGRES_DB');
  }
  get__PG_EMAIL(): string {
    return this.configService.get<string>('POSTGRES_PG_EMAIL');
  }
  get__PG_PASSWORD(): string {
    return this.configService.get<string>('POSTGRES_PG_PASSWORD');
  }
}
