// resource.dto.ts
import { Expose, Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class PermissionDTO {
  @Expose()
  @IsString()
  name: string;
}

export class ResourceDTO {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionDTO)
  permissions: PermissionDTO[];
}

export class RoleDTO {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceDTO)
  resources: ResourceDTO[];
}

export class IAMOutputAllDTO {
  @Expose()
  user_id: number;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleDTO)
  roles: RoleDTO[];
}
