import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CategoryInputID } from '../../categories/dto/create-category.input';

@InputType()
export class CreateSubcategoriryInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsBoolean()
  status: boolean;

  @Field()
  @IsString()
  image: string;

  @Field(() => CategoryInputID)
  @IsNotEmpty()
  category: CategoryInputID;
}

@InputType()
export class SubCategoryInputID {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
