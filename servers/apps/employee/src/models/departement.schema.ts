import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { HotelEMP } from './hotel.schema';
import { EmployeeEMP } from './employee.schema';
import { UserEMP } from './users.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class DepartementEMP extends AbstractEntity<DepartementEMP> {
  @Column({ nullable: true })
  @Field() // for graph
  name: string;

  @Column({ nullable: true })
  @Field() // for graph
  image: string;

  @ManyToMany(() => HotelEMP, (hotel) => hotel.departments)
  @JoinTable()
  hotels: HotelEMP[];

  @OneToMany(() => EmployeeEMP, (employee) => employee.departement, {
    cascade: true,
    eager: true,
  })
  employee: EmployeeEMP[];

  @ManyToOne(() => UserEMP, (user) => user.departement, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEMP;
}
