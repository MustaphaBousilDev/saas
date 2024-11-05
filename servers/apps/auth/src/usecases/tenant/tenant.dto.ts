import { IsString } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  contact_number: string;

  @IsString()
  domain: string;
}
