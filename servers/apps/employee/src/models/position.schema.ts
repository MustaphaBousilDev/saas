import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EmployeeEMP } from './employee.schema';
import { UserEMP } from './users.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class PositionEMP extends AbstractEntity<PositionEMP> {
  @Column({ nullable: true })
  @Field() // for graph
  name: string;

  @Column({ nullable: true })
  @Field() // for graph
  status: boolean;

  @OneToMany(() => EmployeeEMP, (employee) => employee.position, {
    cascade: true,
    eager: true,
  })
  employee: EmployeeEMP[];

  @ManyToOne(() => UserEMP, (user) => user.position, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEMP;
}
