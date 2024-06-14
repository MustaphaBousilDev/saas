import {
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RoleDto } from './role.dto';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@InputType() // for graphql shema when i create or update
export class CreateUserDto {
  @IsEmail()
  @Type(() => String)
  @Field()
  email: string;

  @IsString()
  @Type(() => String)
  @Field()
  firstName: string;

  @IsString()
  @Type(() => String)
  @Field()
  lastName: string;

  @IsStrongPassword()
  @Type(() => String)
  @Field()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  @Field(() => [RoleDto], { nullable: true })
  roles?: RoleDto[];
}
