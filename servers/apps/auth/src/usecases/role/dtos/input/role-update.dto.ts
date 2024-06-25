import { PartialType } from '@nestjs/mapped-types';
import { RoleCreateInputDTO } from './role-create.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RoleUpdateInputDTO extends PartialType(RoleCreateInputDTO) {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
