import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserSTOCK } from './users.schema';
import { StockLocationSTOCK } from './stock.location.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class StockMovementSTOCK extends AbstractEntity<StockMovementSTOCK> {
  @ManyToOne(
    () => StockLocationSTOCK,
    (location) => location.stockMovementStart,
    {
      nullable: true,
      orphanedRowAction: 'delete',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  FromLocationID: StockLocationSTOCK;

  @ManyToOne(
    () => StockLocationSTOCK,
    (location) => location.stockMovementEnd,
    {
      nullable: true,
      orphanedRowAction: 'delete',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  ToLocationID: StockLocationSTOCK;

  @Column()
  @Field()
  Quantity: number;

  @Column()
  @Field()
  MovementDate: Date;

  @ManyToOne(() => UserSTOCK, (user) => user.movmentStock, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;
}
