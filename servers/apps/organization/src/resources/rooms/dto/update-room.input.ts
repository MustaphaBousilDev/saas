import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  /*IsNotEmpty*/
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { HotelIDDtoInput } from '../../hotels/dto/create-hotel.input';

@InputType()
export class UpdateRoomInput {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Field({ nullable: true })
  roomNumber?: number;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  type?: string;

  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  image?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @Field({ nullable: true })
  isAvailable?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Field({ nullable: true })
  price?: number;

  @IsOptional()
  @Field(() => HotelIDDtoInput, { nullable: true })
  hotel?: HotelIDDtoInput;
}
