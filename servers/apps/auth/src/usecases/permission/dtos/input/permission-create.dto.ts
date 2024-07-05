import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PermissionCreateInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsOptional()
  readonly status: boolean;
}
