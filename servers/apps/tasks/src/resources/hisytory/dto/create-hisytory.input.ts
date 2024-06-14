import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHisytoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
