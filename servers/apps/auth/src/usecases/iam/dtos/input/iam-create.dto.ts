import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ResourceDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  permissions: string[];
}

class RoleDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => ResourceDTO)
  @IsArray()
  @IsNotEmpty()
  resources: ResourceDTO[];
}

export class IAMCreateInputDTO {
  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsBoolean()
  readonly isActivate?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly status?: boolean;

  @IsNumber()
  readonly userId: number;

  @ValidateNested({ each: true })
  @Type(() => RoleDTO)
  @IsArray()
  @IsNotEmpty()
  readonly roles: RoleDTO[];
}
