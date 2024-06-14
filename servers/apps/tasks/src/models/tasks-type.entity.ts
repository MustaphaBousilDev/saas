import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { TasksTASKS } from './tasks.entity';
import { DepartementTASKS } from './departement.entity';

@ObjectType()
@Entity()
export class TasksTypeTASKS extends AbstractEntity<TasksTypeTASKS> {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [TasksTASKS], { nullable: true })
  @OneToMany(() => TasksTASKS, (tasks) => tasks.taskType, {
    nullable: true,
  })
  tasks: TasksTASKS[];

  @OneToOne(() => DepartementTASKS, { nullable: true })
  @JoinColumn()
  departement: DepartementTASKS;
}
