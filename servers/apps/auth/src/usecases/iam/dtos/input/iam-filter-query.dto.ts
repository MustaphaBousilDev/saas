import { IsOptional, IsString } from 'class-validator';

export class IAMFilterDTO {
  @IsOptional()
  @IsString()
  status?: boolean;

  @IsOptional()
  page?: string;

  @IsOptional()
  pageSize?: number;
}
