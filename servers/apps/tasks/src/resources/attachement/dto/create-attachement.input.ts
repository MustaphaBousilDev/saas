import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAttachementInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
