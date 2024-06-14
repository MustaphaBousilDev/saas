import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  /*ManyToOne*/
  OneToMany,
} from 'typeorm';
import { HotelORG } from './hotel.schema';
import { EmployeeORG } from './employee.schema';
import { UserORG } from './users.mysql.entity';

@Entity()
@ObjectType() // for add it in schema qraphql
export class DepartementORG extends AbstractEntity<DepartementORG> {
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

  @ManyToMany(() => HotelORG, (hotel) => hotel.departments)
  @JoinTable()
  hotels: HotelORG[];

  @ManyToOne(() => UserORG, (user) => user.departement, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserORG;

  @OneToMany(() => EmployeeORG, (employee) => employee.departement, {
    cascade: true,
    eager: true,
  })
  employee: EmployeeORG[];
}
