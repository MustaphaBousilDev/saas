import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateTagInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
}
