import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CityIDInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
