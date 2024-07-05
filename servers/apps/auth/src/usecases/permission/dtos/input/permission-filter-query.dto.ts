import { IsOptional, IsString } from 'class-validator';

export class PermissionFilterDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: boolean;

  @IsOptional()
  page?: string;

  @IsOptional()
  pageSize?: number;
}
