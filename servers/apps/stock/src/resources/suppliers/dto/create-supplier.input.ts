import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSupplierInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  ContactInfo: string;
}

@InputType()
export class SupplierIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
