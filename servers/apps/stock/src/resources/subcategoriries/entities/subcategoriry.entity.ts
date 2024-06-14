import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Subcategoriry {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
