import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class OrganizationIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
