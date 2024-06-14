import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EmployeeIDDtoInput } from './employee.dto';

@InputType()
export class TaskAttachementInput {
  @Field(() => String, { nullable: true })
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  file_name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  file_url: string;

  @Field(() => EmployeeIDDtoInput, { nullable: true })
  @IsOptional()
  employee: EmployeeIDDtoInput;
}

@InputType()
export class TaskAttachementIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
