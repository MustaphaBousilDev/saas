import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SigninResponse {
  @Field()
  _id: number;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  roles?: string[];
}
