import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Attachement {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
