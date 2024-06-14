import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class StockLocationIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
