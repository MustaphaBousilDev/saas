import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserSTOCK } from './users.schema';
import { ProductSTOCK } from './products.schema';
@Entity()
@ObjectType() // for add it in schema qraphql
export class BrandSTOCK extends AbstractEntity<BrandSTOCK> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @Column()
  @Field()
  status: boolean;

  @Column()
  @Field() // for graph
  image: string;

  @Field(() => UserSTOCK, { nullable: true })
  @ManyToOne(() => UserSTOCK, (user) => user.brand, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;

  @OneToMany(() => ProductSTOCK, (product) => product.brand, {
    cascade: true,
    eager: true,
  })
  products: ProductSTOCK[];
}
