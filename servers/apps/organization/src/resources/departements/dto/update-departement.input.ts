import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class UpdateDepartementInput {
  @IsOptional()
  @Type(() => String)
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Type(() => String)
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @Field({ nullable: true })
  status?: boolean;

  @IsOptional()
  @Type(() => String)
  @Field({ nullable: true })
  image?: string;
}
