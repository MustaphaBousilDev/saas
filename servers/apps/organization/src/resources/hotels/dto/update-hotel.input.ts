import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrganizationIDInput } from '../../../dto/organization.input.dto';
import { DepartementIDDtoInput } from '../../departements/dto/create-departement.input';
import { CityIDInput } from '../../../dto/cities.dto';

@InputType()
export class UpdateHotelInput {
  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  address?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  phone?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  email?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  latitude?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  longitude?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @Field({ nullable: true })
  status?: boolean;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  image?: string;

  @IsOptional()
  @Field(() => OrganizationIDInput, { nullable: true })
  @IsNotEmpty()
  organization?: OrganizationIDInput;

  @IsOptional()
  @IsNumber()
  @Field(() => CityIDInput, { nullable: true })
  city?: CityIDInput;

  @IsOptional()
  @Field(() => [DepartementIDDtoInput], { nullable: true })
  @IsOptional()
  departements?: DepartementIDDtoInput[];
}

@InputType()
export class HotelIDDtoUpdate {
  @Field(() => Number)
  @IsOptional()
  id: number;
}
