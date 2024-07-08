import { PartialType } from '@nestjs/mapped-types';
import { ResourceCreateInputDTO } from './resource-create.dto';

export class ResourceUpdateInputDTO extends PartialType(
  ResourceCreateInputDTO,
) {}
