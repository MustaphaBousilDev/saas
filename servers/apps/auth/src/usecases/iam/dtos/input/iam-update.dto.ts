import { PartialType } from '@nestjs/mapped-types';
import { IAMCreateInputDTO } from './iam-create.dto';

export class IAMUpdateInputDTO extends PartialType(IAMCreateInputDTO) {}
