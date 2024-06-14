import { CreateAttachementInput } from './create-attachement.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAttachementInput extends PartialType(CreateAttachementInput) {
  @Field(() => Int)
  id: number;
}
