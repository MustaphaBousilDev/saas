import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ResourceCreateInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  readonly status: boolean;

  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
