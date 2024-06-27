import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RoleCreateInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsOptional()
  readonly status: boolean;
}
