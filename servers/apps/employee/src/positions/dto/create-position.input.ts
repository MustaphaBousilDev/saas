import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePositionInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsString()
  name: string;

  @Field(() => Boolean, { description: 'status of position work' })
  @IsBoolean()
  status: boolean;
}

@InputType()
export class PositionIDDtoInput {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;
}
