import { IsEmail, IsString, Validate, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsPhoneNumber } from '@app/shared';

@InputType() // for graphql shema when i create or update
export class OrganizationInputDto {
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  name: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  @Validate(IsPhoneNumber)
  phone1: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  @Validate(IsPhoneNumber)
  phone2: string;

  @IsEmail()
  @Type(() => String)
  @Field({ nullable: true })
  email: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  website: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Field({ nullable: true })
  description: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  logo: string;
}

@InputType()
export class OrganizationIDInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
