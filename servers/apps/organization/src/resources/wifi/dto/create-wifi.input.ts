import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { HotelIDDtoInput } from '../../hotels/dto/create-hotel.input';

@InputType()
export class CreateWifiInput {
  @IsString()
  @Type(() => String)
  @Field()
  name: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  ip: string;

  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  password: string;

  @Field(() => HotelIDDtoInput)
  @IsNotEmpty()
  hotel: HotelIDDtoInput;
}
