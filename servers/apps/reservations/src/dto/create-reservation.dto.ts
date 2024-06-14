import { CreateChargeDto } from '@app/shared';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  //IsNotEmpty,
  // IsNotEmpty,
  // IsNotEmpty,
  IsNotEmptyObject,
  // IsString,
  // IsNumber,
  // IsString,
  ValidateNested,
} from 'class-validator';
import { HotelIDInput } from './hotel.dto';
import { RoomIDInputForReservation } from './room.dto';
@InputType() // for graphql shema when i create or update
export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  @Field()
  startDate: Date;
  @IsDate()
  @Type(() => Date)
  @Field()
  endDate: Date;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  @Field(() => CreateChargeDto)
  charge: CreateChargeDto;

  @Field(() => HotelIDInput)
  @IsNotEmpty()
  hotel: HotelIDInput;

  @Field(() => RoomIDInputForReservation)
  @IsNotEmpty()
  room: RoomIDInputForReservation;
}
