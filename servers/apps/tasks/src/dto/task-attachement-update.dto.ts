import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EmployeeIDDtoInput } from './employee.dto';
import { Type } from 'class-transformer';

@InputType()
export class TaskAttachementUpdateDTO {
  @IsString()
  @IsOptional()
  @Type(() => String)
  @Field(() => String, { nullable: true })
  name?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  file_name?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  file_url?: string;

  @IsString()
  @IsOptional()
  @Field(() => EmployeeIDDtoInput, { nullable: true })
  employee?: EmployeeIDDtoInput;
}

@InputType()
export class TaskAttachementIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
