import { TasksTASKS } from './tasks.entity';
import { EmployeeTASKS } from './employee.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/shared';
export enum TaskStatusHistory {
  PENDING = 'pending',
  DOING = 'doing',
  DONE = 'done',
  CANCEL = 'cancel',
}

export enum TaskPriorityHistory {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

registerEnumType(TaskStatusHistory, {
  name: 'TaskStatusHistory', // GraphQL type name
});

registerEnumType(TaskPriorityHistory, {
  name: 'TaskPriorityHistory', // GraphQL type name
});

@ObjectType()
@Entity()
export class Task_HistoryTASKS extends AbstractEntity<Task_HistoryTASKS> {
  @Field(() => Date)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  changeDate: Date;

  @Field(() => TaskStatusHistory, { nullable: true })
  @Column({
    type: 'enum',
    enum: TaskStatusHistory,
    default: TaskStatusHistory.PENDING,
    nullable: true,
  })
  status: TaskStatusHistory;

  @Field(() => TaskPriorityHistory, { nullable: true })
  @Column({
    type: 'enum',
    enum: TaskPriorityHistory,
    default: TaskPriorityHistory.LOW,
    nullable: true,
  })
  priority: TaskPriorityHistory;

  // Define relationships
  @Field(() => TasksTASKS, { nullable: true })
  @ManyToOne(() => TasksTASKS, (task) => task.tasks_history, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  task: TasksTASKS;

  @Field(() => EmployeeTASKS, { nullable: true })
  @ManyToOne(() => EmployeeTASKS, (employee) => employee.tasks_history, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  employee: EmployeeTASKS;
}
