import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ isAbstract: true }) //for graphql shcema
export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  _id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
