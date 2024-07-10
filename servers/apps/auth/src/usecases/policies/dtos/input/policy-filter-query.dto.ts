import { IsOptional, IsString } from 'class-validator';

export class PolicyFilterDTO {
  @IsOptional()
  @IsString()
  policyName?: string;

  @IsOptional()
  @IsString()
  status?: boolean;

  @IsOptional()
  page?: string;

  @IsOptional()
  pageSize?: number;
}
