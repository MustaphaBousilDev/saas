import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { HotelIDDtoInput } from '../../hotels/dto/create-hotel.input';

@InputType()
export class UpdateWifiInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  ip?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @Field({ nullable: true })
  password?: string;

  @IsOptional()
  @Field(() => HotelIDDtoInput, { nullable: true })
  hotel?: HotelIDDtoInput;
}
