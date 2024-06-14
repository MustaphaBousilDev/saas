import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserSTOCK } from './users.schema';
@Entity()
@ObjectType() // for add it in schema qraphql
export class TagsSTOCK extends AbstractEntity<TagsSTOCK> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @ManyToOne(() => UserSTOCK, (user) => user.tags, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;
}
