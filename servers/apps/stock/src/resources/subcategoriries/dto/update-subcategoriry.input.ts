import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryInputID } from '../../categories/dto/create-category.input';

@InputType()
export class UpdateSubcategoriryInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  image?: string;

  @IsOptional()
  @Field(() => CategoryInputID, { nullable: true })
  @IsNotEmpty()
  category?: CategoryInputID;
}
