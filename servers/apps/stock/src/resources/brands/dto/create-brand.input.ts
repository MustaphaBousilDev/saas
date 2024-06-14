import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateBrandInput {
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
export class BrandInputID {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
