import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInfoDto {
  @Field()
  _id: number;
  @Field()
  email: string;
  @Field()
  password: string;
}
