import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class HotelIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
