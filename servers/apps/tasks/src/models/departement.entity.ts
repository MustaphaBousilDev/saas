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
import { HotelTASKS } from './hotel.entity';
import { EmployeeTASKS } from './employee.entity';
import { UserTASKS } from './users.repository';

@Entity()
@ObjectType() // for add it in schema qraphql
export class DepartementTASKS extends AbstractEntity<DepartementTASKS> {
  @Column()
  @Field() // for graph
  name: string;

  @Column()
  @Field() // for graph
  image: string;

  @ManyToMany(() => HotelTASKS)
  @JoinTable()
  hotels: HotelTASKS[];

  @OneToMany(() => EmployeeTASKS, (employee) => employee.departement, {
    cascade: true,
    eager: true,
  })
  employee: EmployeeTASKS[];

  @ManyToOne(() => UserTASKS, (user) => user.departement, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  user: UserTASKS;
}
