import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { TIME_WORK } from '../../models/time-work.schema';

@InputType()
export class CreateTimeworkInput {
  @IsEnum(TIME_WORK)
  @Type(() => String)
  @Field(() => TIME_WORK, { description: 'name enum' })
  name: TIME_WORK;

  @IsBoolean()
  @Type(() => Boolean)
  @Field({
    nullable: true,
    defaultValue: true,
  })
  status: boolean;
}

@InputType()
export class TimeWorkIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
