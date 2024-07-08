import { IsOptional, IsString } from 'class-validator';

export class ResourceFilterDTO {
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
