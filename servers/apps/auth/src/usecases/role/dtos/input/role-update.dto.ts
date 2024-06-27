import { PartialType } from '@nestjs/mapped-types';
import { RoleCreateInputDTO } from './role-create.dto';

export class RoleUpdateInputDTO extends PartialType(RoleCreateInputDTO) {}
