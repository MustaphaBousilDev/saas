import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@ObjectType()
export class UpdateOrganizationGraph {
  @Type(() => Number)
  @Field({ nullable: true }) // Adding nullable: true makes the field optional
  _id: number;

  @Type(() => String)
  @Field({ nullable: true }) // Adding nullable: true makes the field optional
  name: string;

  @Type(() => String)
  @Field({ nullable: true })
  phone1: string;

  @Type(() => String)
  @Field({ nullable: true })
  phone2: string;

  @Type(() => String)
  @Field({ nullable: true })
  email: string;

  @Type(() => String)
  @Field({ nullable: true })
  website: string;

  @Type(() => String)
  @Field({ nullable: true })
  description: string;

  @Type(() => String)
  @Field({ nullable: true })
  logo: string;
}
