import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTagInput {
  @Field()
  @IsString()
  name: string;
}

@InputType()
export class TagsIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
