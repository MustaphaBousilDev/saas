import { CreateHisytoryInput } from './create-hisytory.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHisytoryInput extends PartialType(CreateHisytoryInput) {
  @Field(() => Int)
  id: number;
}
