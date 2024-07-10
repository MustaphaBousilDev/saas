import { PartialType } from '@nestjs/mapped-types';
import { PolicyCreateInputDTO } from './policy-create.dto';

export class PolicyUpdateInputDTO extends PartialType(PolicyCreateInputDTO) {}
