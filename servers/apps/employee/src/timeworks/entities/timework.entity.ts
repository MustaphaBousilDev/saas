import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Timework {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
