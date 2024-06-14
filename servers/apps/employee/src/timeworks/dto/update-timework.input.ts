import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { TIME_WORK } from '../../models/time-work.schema';

@InputType()
export class UpdateTimeworkInput {
  @IsOptional()
  @IsEnum(TIME_WORK)
  @Type(() => String)
  @Field(() => TIME_WORK, { description: 'name enum' })
  name?: TIME_WORK;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @Field({
    nullable: true,
    defaultValue: true,
  })
  status?: boolean;
}
