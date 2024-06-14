import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@app/shared';
import { Role } from './role.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User extends AbstractEntity<User> {
  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  // i dont want to add Field into password , because password is sensitive data
  password: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  @Field(() => [String])
  roles?: Role[];
}
