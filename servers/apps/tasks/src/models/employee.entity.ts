import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DepartementTASKS } from './departement.entity';
import { TasksAttachTASKS } from './tasks-attachement.entity';
import { Task_HistoryTASKS } from './task-history.entity';

@Entity()
@ObjectType() // for add it in schema qraphql
export class EmployeeTASKS extends AbstractEntity<EmployeeTASKS> {
  @Column()
  @Field() // for graph
  firstName: string;

  @Column()
  @Field() // for graph
  lastName: string;

  @Column()
  @Field() // for graph
  superVisorID: string;

  @Column()
  @Field() // for graph
  isActivate: boolean;

  @Column()
  @Field() // for graph
  image: string;

  @ManyToOne(() => DepartementTASKS, (departement) => departement.employee, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  departement: DepartementTASKS;

  @Field(() => [TasksAttachTASKS], { nullable: true })
  @OneToMany(() => TasksAttachTASKS, (tasksAttach) => tasksAttach.employee, {
    nullable: true,
  })
  tasksAttach: TasksAttachTASKS[];

  @Field(() => [Task_HistoryTASKS], { nullable: true })
  @OneToMany(() => Task_HistoryTASKS, (tasksHistory) => tasksHistory.employee, {
    nullable: true,
  })
  tasks_history: Task_HistoryTASKS[];
}
