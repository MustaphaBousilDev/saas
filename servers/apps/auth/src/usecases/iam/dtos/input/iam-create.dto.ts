import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IAMCreateInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsOptional()
  readonly status: boolean;
}
