import { PartialType } from '@nestjs/mapped-types';
import { PermissionCreateInputDTO } from './permission-create.dto';

export class PermissionUpdateInputDTO extends PartialType(
  PermissionCreateInputDTO,
) {}
