import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CategorySTOCK } from './categories.schema';
import { UserSTOCK } from './users.schema';
import { ProductSTOCK } from './products.schema';
@Entity()
@ObjectType() // for add it in schema qraphql
export class SubCategorySTOCK extends AbstractEntity<SubCategorySTOCK> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @Column()
  @Field()
  status: boolean;

  @OneToMany(() => ProductSTOCK, (product) => product.subCategory, {
    cascade: true,
    eager: true,
  })
  products: ProductSTOCK[];

  @Column()
  @Field() // for graph
  image: string;

  @ManyToOne(() => CategorySTOCK, (category) => category.subCategories, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: CategorySTOCK;

  @ManyToOne(() => UserSTOCK, (user) => user.subcategory, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;
}
