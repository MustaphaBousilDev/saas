import { PolicyCategory } from '@app/infra/persistences';
import {
  IsBoolean,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PolicyCreateInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly policyName: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsJSON()
  readonly policyDocument: JSON;

  @IsNotEmpty()
  @IsEnum(PolicyCategory)
  readonly category: PolicyCategory;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  readonly status: boolean;
}
