import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskTypeIDDtoInput } from './tasks-type.dto';
import { TaskStatus, TaskPriority } from '../models/tasks.entity';
import { EmployeeIDDtoInput } from './employee.dto';
import { TaskAttachementIDDtoInput } from './task-attachement.dto';

@InputType()
export class TasksDtoInput {
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  name: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  description: string;

  @IsEnum(TaskStatus)
  @Type(() => String)
  @Field(() => TaskStatus, { nullable: true })
  status: TaskStatus;

  @IsEnum(TaskPriority)
  // @Type(() => String)
  @Field(() => TaskPriority, { nullable: true })
  priority: TaskPriority;

  @IsDateString()
  @Field({ nullable: true })
  date: Date;

  @IsString()
  @Field({ nullable: true })
  time: string;

  @IsDateString()
  @Field({ nullable: true })
  dueDate: Date;

  @Field(() => [EmployeeIDDtoInput], { nullable: true })
  @IsOptional()
  employees: EmployeeIDDtoInput[];

  @Field(() => TaskTypeIDDtoInput)
  @IsNotEmpty()
  taskType: TaskTypeIDDtoInput;

  @Field(() => TaskAttachementIDDtoInput)
  @IsNotEmpty()
  taskAttachement: TaskAttachementIDDtoInput;
}

@InputType()
export class TaskIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
