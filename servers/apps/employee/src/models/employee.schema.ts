import { AbstractEntity } from '@app/shared';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { DepartementEMP } from './departement.schema';
import { PositionEMP } from './position.schema';
import { TimeWorkEMP } from './time-work.schema';
import { UserEMP } from './users.schema';

export enum Gender {
  HOMME = 'homme',
  FEMME = 'femme',
}

registerEnumType(Gender, {
  name: 'Gender', //GraphQL type name
});

@Entity()
@ObjectType() // for add it in schema qraphql
export class EmployeeEMP extends AbstractEntity<EmployeeEMP> {
  @Column({ nullable: true })
  @Field() // for graph
  firstName: string;

  @Column({ nullable: true })
  @Field() // for graph
  lastName: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.HOMME,
    nullable: true,
  })
  @Field(() => Gender, { nullable: true }) // for graph
  gender: Gender;

  @Column({ nullable: true })
  @Field() // for graph
  dateOfBirth: Date;

  @Column({ nullable: true })
  @Field() // for graph
  dateOfHired: Date;

  @Column({ nullable: true })
  @Field() // for graph
  contactNumber: string;

  @Column({ nullable: true })
  @Field() // for graph
  email: string;

  @Column({ nullable: true })
  @Field() // for graph
  address: string;

  @Column({ nullable: true })
  @Field() // for graph
  salary: number;

  @Column({ nullable: true })
  @Field() // for graph
  superVisorID: string;

  @Column({ nullable: true })
  @Field() // for graph
  isActivate: boolean;

  @Column({ nullable: true })
  @Field() // for graph
  image: string;

  @Field(() => DepartementEMP, { nullable: true })
  @ManyToOne(() => DepartementEMP, (departement) => departement.employee, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  departement: DepartementEMP;

  @Field(() => UserEMP, { nullable: true })
  @ManyToOne(() => UserEMP, (user) => user.employees, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEMP;

  @Field(() => PositionEMP, { nullable: true })
  @ManyToOne(() => PositionEMP, (position) => position.employee, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  position: PositionEMP;

  @Field(() => TimeWorkEMP, { nullable: true })
  @ManyToOne(() => TimeWorkEMP, (organization) => organization.employee, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  timeWork: TimeWorkEMP;
}
