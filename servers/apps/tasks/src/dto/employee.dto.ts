import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class EmployeeIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
