import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateSupplierInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ContactInfo?: string;
}

@InputType()
export class SupplierIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
