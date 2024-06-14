export interface DatabaseConfig {
  getDatabaseHost(): string;
  getDatabasePort(): number;
  getDatabaseUser(): string;
  getDatabasePassword(): string;
  getDatabaseName(): string;
  getDatabaseSchema(): string;
  getDatabaseSync(): boolean;
  get__POSTGRE_USER(): string;
  get__PASSWORD_USER(): string;
  get__PORT_POSTGRES(): number;
  get__HOST_LOCAL(): string;
  get__HOST_DOCKER(): string;
  get__DB_PG(): string;
  get__PG_EMAIL(): string;
  get__PG_PASSWORD(): string;
}
