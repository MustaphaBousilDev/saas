import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class RoleDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Field({ nullable: true })
  id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Field({ nullable: true })
  name?: string;
}
