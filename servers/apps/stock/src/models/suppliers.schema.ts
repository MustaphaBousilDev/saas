import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProductSTOCK } from './products.schema';
import { UserSTOCK } from './users.schema';
@Entity()
@ObjectType() // for add it in schema qraphql
export class SuppliersSTOCK extends AbstractEntity<SuppliersSTOCK> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @Column()
  @Field()
  ContactInfo: string;

  @OneToMany(() => ProductSTOCK, (product) => product.supplier, {
    cascade: true,
    eager: true,
  })
  products: ProductSTOCK[];

  @ManyToOne(() => UserSTOCK, (user) => user.suplies, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;
}
