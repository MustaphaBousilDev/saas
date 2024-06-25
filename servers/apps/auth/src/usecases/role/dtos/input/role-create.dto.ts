import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RoleCreateInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly status: boolean;
}
