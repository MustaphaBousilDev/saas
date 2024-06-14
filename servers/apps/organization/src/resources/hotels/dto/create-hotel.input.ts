import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OrganizationIDInput } from '../../../dto/organization.input.dto';
import { DepartementIDDtoInput } from '../../departements/dto/create-departement.input';
import { CityIDInput } from '../../../dto/cities.dto';

@InputType()
export class CreateHotelInput {
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  name: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  address: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  phone: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  email: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  description: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  latitude: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  longitude: string;

  @IsBoolean()
  @Type(() => Boolean)
  @Field({ nullable: true })
  status: boolean;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  image: string;

  @Field(() => OrganizationIDInput)
  @IsNotEmpty()
  organization: OrganizationIDInput;

  @Field(() => CityIDInput)
  @IsNotEmpty()
  city: CityIDInput;

  @Field(() => [DepartementIDDtoInput], { nullable: true })
  @IsOptional()
  departements: DepartementIDDtoInput[];
}

@InputType()
export class HotelIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
