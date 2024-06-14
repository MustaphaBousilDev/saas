import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { HotelIDDtoInput } from '../../hotels/dto/create-hotel.input';

@InputType()
export class CreateRoomInput {
  @IsNumber()
  @Type(() => Number)
  @Field()
  roomNumber: number;

  @IsString()
  @Type(() => String)
  @Field()
  type: string;

  @IsString()
  @Type(() => String)
  @Field()
  description: string;

  @IsString()
  @Type(() => String)
  @Field()
  image: string;

  @IsBoolean()
  @Type(() => Boolean)
  @Field()
  isAvailable: boolean;

  @IsNumber()
  @Type(() => Number)
  @Field()
  price: number;

  @Field(() => HotelIDDtoInput)
  @IsNotEmpty()
  hotel: HotelIDDtoInput;
}
