import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductSTOCK } from './products.schema';
import { UserSTOCK } from './users.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class StockTransactionSTOCK extends AbstractEntity<StockTransactionSTOCK> {
  @Column()
  @Field()
  TransactionType: number; // enum('IN','OUT')

  @Column()
  @Field()
  Quantity: number;

  @Column()
  @Field()
  TransactionDate: number;

  @ManyToOne(() => ProductSTOCK, (product) => product.productTransaction, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductSTOCK;

  @ManyToOne(() => UserSTOCK, (user) => user.stockTransaction, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;
}
