import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DepartementSTOCK } from './departement.schema';
import { UserSTOCK } from './users.schema';
import { ProductDetailsSTOCK } from './product.details.schema';
// import { Departement } from './departement.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class EmployeeSTOCK extends AbstractEntity<EmployeeSTOCK> {
  @Column()
  @Field() // for graph
  name: string;

  @Column()
  @Field() // for graph
  image: string;

  @ManyToOne(() => DepartementSTOCK, (departement) => departement.employee, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  departement: DepartementSTOCK;

  @OneToMany(() => ProductDetailsSTOCK, (product) => product.employee, {
    cascade: true,
    eager: true,
  })
  products: ProductDetailsSTOCK[];

  @ManyToOne(() => UserSTOCK, (user) => user.employee, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;
}
