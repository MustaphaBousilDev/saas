import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  TaskStatusHistory as TaskStausHistory,
  TaskPriorityHistory,
} from '../models/task-history.entity';
import { EmployeeIDDtoInput } from './employee.dto';
import { TaskIDDtoInput } from './tasks.dto';

@InputType()
export class TasksHistoryDtoInput {
  @IsString()
  @Type(() => Date)
  @Field(() => Date, { nullable: true })
  changeDate: Date;

  @IsEnum(TaskStausHistory)
  // @Type(() => String)
  @Field(() => TaskStausHistory, { nullable: true })
  status: TaskStausHistory;

  @IsEnum(TaskPriorityHistory)
  // @Type(() => String)
  @Field(() => TaskPriorityHistory, { nullable: true })
  priority: TaskPriorityHistory;

  @Field(() => EmployeeIDDtoInput, { nullable: true })
  @IsOptional()
  employees: EmployeeIDDtoInput;

  @Field(() => TaskIDDtoInput, { nullable: true })
  @IsOptional()
  task: TaskIDDtoInput;
}
