import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToOne, OneToOne } from 'typeorm';
import { UserSTOCK } from './users.schema';
import { EmployeeSTOCK } from './employe.responsable.schema';
import { HotelSTOCK } from './hotel.schema';
import { ProductSTOCK } from './products.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class ProductDetailsSTOCK extends AbstractEntity<ProductDetailsSTOCK> {
  @OneToOne(() => ProductSTOCK, { nullable: true })
  @JoinTable()
  product: ProductSTOCK;

  @Column()
  @Field({ nullable: true }) // for graph
  regular_price: string;

  @Column()
  @Field({ nullable: true })
  price: string;

  @Column()
  @Field({ nullable: true })
  made: string;

  @Column()
  @Field({ nullable: true })
  code: string;

  @ManyToOne(() => UserSTOCK, (user) => user.product, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;

  @ManyToOne(() => EmployeeSTOCK, (emp) => emp.products, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  employee: EmployeeSTOCK;

  @ManyToOne(() => HotelSTOCK, (hotel) => hotel.products, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: HotelSTOCK;
}
