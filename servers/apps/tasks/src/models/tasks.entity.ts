import { AbstractEntity } from '@app/shared';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TasksTypeTASKS } from './tasks-type.entity';
import { EmployeeTASKS } from './employee.entity';
import { TasksAttachTASKS } from './tasks-attachement.entity';
import { Task_HistoryTASKS } from './task-history.entity';

export enum TaskStatus {
  PENDING = 'pending',
  DOING = 'doing',
  DONE = 'done',
  CANCEL = 'cancel',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus', // GraphQL type name
});

registerEnumType(TaskPriority, {
  name: 'TaskPriority', // GraphQL type name
});

@ObjectType()
@Entity()
export class TasksTASKS extends AbstractEntity<TasksTASKS> {
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => TaskStatus, { nullable: true })
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
    nullable: true,
  })
  status: TaskStatus;

  @Field(() => TaskPriority, { nullable: true })
  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.LOW,
    nullable: true,
  })
  priority: TaskPriority;

  @Field(() => TasksTypeTASKS, { nullable: true })
  @ManyToOne(() => TasksTypeTASKS, (tasktype) => tasktype.tasks, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  taskType: TasksTypeTASKS;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'date', nullable: true })
  date: Date;

  @Field(() => String, { nullable: true })
  @Column({ type: 'time', nullable: true })
  time: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Field(() => [EmployeeTASKS], { nullable: true })
  @ManyToMany(() => EmployeeTASKS, { nullable: true })
  @JoinTable()
  employees: EmployeeTASKS[];

  @Field(() => TasksAttachTASKS, { nullable: true })
  @ManyToOne(() => TasksAttachTASKS, (taskAttach) => taskAttach.tasks, {
    nullable: true,
  })
  taskAttachement: TasksAttachTASKS;

  @Field(() => [Task_HistoryTASKS], { nullable: true })
  @OneToMany(() => Task_HistoryTASKS, (tasksHistory) => tasksHistory.task, {
    nullable: true,
  })
  tasks_history: Task_HistoryTASKS[];
}
