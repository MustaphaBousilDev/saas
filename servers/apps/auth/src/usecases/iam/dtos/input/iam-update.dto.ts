import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Update DTO for permissions
class UpdatePermissionDTO {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  permissions?: string[];
}

// Update DTO for resources
class UpdateResourceDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @ValidateNested()
  @Type(() => UpdatePermissionDTO)
  @IsOptional()
  permission?: UpdatePermissionDTO[];
}

// Update DTO for roles
class UpdateRoleDTO {
  @IsString()
  @IsOptional()
  role?: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateResourceDTO)
  @IsOptional()
  resource?: UpdateResourceDTO[];
}

// Main Update DTO
export class IAMUpdateInputDTO {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActivate?: boolean;

  @IsOptional()
  status?: boolean;

  @IsOptional()
  user?: number;

  @ValidateNested({ each: true })
  @Type(() => UpdateRoleDTO)
  @IsArray()
  @IsOptional()
  roles?: UpdateRoleDTO[];
}
