import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserSTOCK } from './users.schema';
import { SubCategorySTOCK } from './subcategories.schema';
import { HotelSTOCK } from './hotel.schema';
@Entity()
@ObjectType() // for add it in schema qraphql
export class CategorySTOCK extends AbstractEntity<CategorySTOCK> {
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
  @ManyToOne(() => UserSTOCK, (user) => user.category, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;

  @OneToMany(() => SubCategorySTOCK, (subcat) => subcat.category, {
    cascade: true,
    eager: true,
  })
  subCategories: SubCategorySTOCK[];

  @ManyToMany(() => HotelSTOCK, (hotel) => hotel.categories)
  @JoinTable()
  hotels: HotelSTOCK[];
}
