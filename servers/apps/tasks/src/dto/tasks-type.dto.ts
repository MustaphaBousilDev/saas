import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DepartementIDDtoInput } from './departement-id.dto';

@InputType()
export class TasksTypeDtoInput {
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  name: string;

  @Field(() => DepartementIDDtoInput, { nullable: true })
  @IsOptional()
  departement: DepartementIDDtoInput;
}

@InputType()
export class TaskTypeIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
