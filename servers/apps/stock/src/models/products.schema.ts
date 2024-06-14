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
import { BrandSTOCK } from './brands.schema';
import { SuppliersSTOCK } from './suppliers.schema';
import { TagsSTOCK } from './tags.schema';
import { StockLocationSTOCK } from './stock.location.schema';
import { StockTransactionSTOCK } from './stock.transaction.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class ProductSTOCK extends AbstractEntity<ProductSTOCK> {
  @Column()
  @Field({ nullable: true }) // for graph
  name: string;

  @Column()
  @Field({ nullable: true }) // for graph
  description: string;

  @ManyToOne(() => UserSTOCK, (user) => user.product, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;

  @ManyToOne(() => SubCategorySTOCK, (subCat) => subCat.products, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  subCategory: SubCategorySTOCK;

  @Column()
  @Field({ nullable: true })
  quantity: number;

  @Column()
  @Field({ nullable: true })
  price: number;

  @ManyToOne(() => SuppliersSTOCK, (supplier) => supplier.products, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  supplier: SuppliersSTOCK;

  @ManyToMany(() => TagsSTOCK)
  @JoinTable()
  tags: TagsSTOCK[];

  @ManyToOne(() => BrandSTOCK, (brand) => brand.products, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  brand: BrandSTOCK;

  @Column()
  @Field()
  status: boolean;

  @ManyToOne(() => HotelSTOCK, (hotel) => hotel.products, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: HotelSTOCK;

  @ManyToOne(() => StockLocationSTOCK, (stock) => stock.products, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  location: StockLocationSTOCK;

  @OneToMany(
    () => StockTransactionSTOCK,
    (stockTransaction) => stockTransaction.product,
    {
      cascade: true,
      eager: true,
      nullable: true,
    },
  )
  productTransaction: StockTransactionSTOCK[];
}
