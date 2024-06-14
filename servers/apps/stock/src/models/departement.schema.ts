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
import { EmployeeSTOCK } from './employe.responsable.schema';
import { HotelSTOCK } from './hotel.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class DepartementSTOCK extends AbstractEntity<DepartementSTOCK> {
  @Column()
  @Field() // for graph
  name: string;

  @Column()
  @Field() // for graph
  description: string;

  @Column({ default: false })
  @Field() // for graph
  status: boolean;

  @Column()
  @Field() // for graph
  image: string;

  @ManyToMany(() => HotelSTOCK, (hotel) => hotel.departments)
  @JoinTable()
  hotels: HotelSTOCK[];

  @Field(() => UserSTOCK, { nullable: true })
  @ManyToOne(() => UserSTOCK, (user) => user.departements, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserSTOCK;

  @Field(() => [EmployeeSTOCK], { nullable: true })
  @OneToMany(() => EmployeeSTOCK, (emp) => emp.departement, {
    cascade: true,
    eager: true,
  })
  employee: EmployeeSTOCK[];
}
