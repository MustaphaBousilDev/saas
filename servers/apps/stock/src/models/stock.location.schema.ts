import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserSTOCK } from './users.schema';
import { ProductSTOCK } from './products.schema';
import { StockMovementSTOCK } from './stock.movment.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class StockLocationSTOCK extends AbstractEntity<StockLocationSTOCK> {
  @Column()
  @Field({ nullable: true }) // for graph
  location_Name: string;

  @ManyToOne(() => UserSTOCK, (user) => user.stockLocation, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;

  @OneToMany(() => ProductSTOCK, (product) => product.location, {
    cascade: true,
    eager: true,
  })
  products: ProductSTOCK[];

  @OneToMany(
    () => StockMovementSTOCK,
    (stockMovment) => stockMovment.FromLocationID,
    {
      cascade: true,
      eager: true,
    },
  )
  stockMovementStart: StockMovementSTOCK[];

  @OneToMany(
    () => StockMovementSTOCK,
    (stockMovment) => stockMovment.ToLocationID,
    {
      cascade: true,
      eager: true,
    },
  )
  stockMovementEnd: StockMovementSTOCK[];
}
