import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EmployeeTASKS } from './employee.entity';
import { TasksTASKS } from './tasks.entity';

@ObjectType()
@Entity()
export class TasksAttachTASKS extends AbstractEntity<TasksAttachTASKS> {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  file_name: string;

  @Field(() => String)
  @Column()
  file_url: string;

  @Field(() => EmployeeTASKS, { nullable: true })
  @ManyToOne(() => EmployeeTASKS, (emp) => emp.tasksAttach)
  employee: EmployeeTASKS;

  @Field(() => [TasksTASKS], { nullable: true })
  @OneToMany(() => TasksTASKS, (tasks) => tasks.taskAttachement, {
    nullable: true,
  })
  tasks: TasksTASKS[];
}
