import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, OneToOne } from 'typeorm';
import { ProductSTOCK } from './products.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class ProductImageSTOCK extends AbstractEntity<ProductImageSTOCK> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field({ nullable: true }) // for graph
  file_name: string;

  @Column()
  @Field()
  file_url: string;

  @OneToOne(() => ProductSTOCK, { nullable: true })
  @JoinTable()
  product: ProductSTOCK;

  @Column()
  @Field()
  file_url_resize_img: string;
}
