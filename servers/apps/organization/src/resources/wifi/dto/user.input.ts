import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  firstName: string;

  @Field(() => String)
  @IsNotEmpty()
  lastName: string;

  @Field(() => String)
  @IsNotEmpty()
  email: string;
}
