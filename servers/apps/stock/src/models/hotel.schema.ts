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
import { OrganizationSTOCK } from './organization.schema';
import { UserSTOCK } from './users.schema';
import { DepartementSTOCK } from './departement.schema';
import { CategorySTOCK } from './categories.schema';
import { ProductSTOCK } from './products.schema';
@Entity()
@ObjectType() // for add it in schema qraphql
export class HotelSTOCK extends AbstractEntity<HotelSTOCK> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @Column()
  @Field() // for graph
  image: string;

  @ManyToOne(() => OrganizationSTOCK, (organization) => organization.hotel, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  organization: OrganizationSTOCK;

  @ManyToOne(() => UserSTOCK, (user) => user.hotel, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;

  @ManyToMany(() => DepartementSTOCK, (departments) => departments.hotels)
  @JoinTable()
  departments: DepartementSTOCK[];

  @ManyToMany(() => CategorySTOCK, (category) => category.hotels)
  @JoinTable()
  categories: CategorySTOCK[];

  @OneToMany(() => ProductSTOCK, (product) => product.hotel, {
    cascade: true,
    eager: true,
  })
  products: ProductSTOCK[];
}
