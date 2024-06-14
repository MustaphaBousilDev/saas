import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '../models/employee.schema';
import { DepartementIDDtoInput } from './remote/departement.dto';
import { PositionIDDtoInput } from '../positions/dto/create-position.input';
import { TimeWorkIDDtoInput } from '../timeworks/dto/create-timework.input';

@InputType()
export class EmployeeDtoUpdate {
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  firstName?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  lastName?: string;

  @IsOptional()
  @IsEnum(Gender)
  @Type(() => String)
  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  dateOfBirth?: Date;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  dateOfHired?: Date;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  contactNumber?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  email?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  address?: string;

  @IsOptional()
  @IsString()
  @Type(() => Number)
  @Field({ nullable: true })
  salary?: number;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  superVisorID?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @Field({ nullable: true })
  isActivate?: boolean;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  image?: string;

  @IsOptional()
  @Field(() => DepartementIDDtoInput, { nullable: true })
  @IsOptional()
  departement?: DepartementIDDtoInput;

  @IsOptional()
  @Field(() => PositionIDDtoInput, { nullable: true })
  @IsOptional()
  position?: PositionIDDtoInput;

  @IsOptional()
  @Field(() => TimeWorkIDDtoInput, { nullable: true })
  @IsOptional()
  timeWork?: TimeWorkIDDtoInput;
}

@InputType()
export class EmployeeIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
