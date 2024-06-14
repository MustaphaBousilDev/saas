import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsBoolean()
  status: boolean;

  @Field()
  @IsString()
  image: string;
}

@InputType()
export class CategoryInputID {
  @Field(() => Number)
  id: number;
}
