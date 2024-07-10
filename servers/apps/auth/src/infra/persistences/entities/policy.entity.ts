import { AbstractEntity } from '@app/shared';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserAuth } from './user.entity';

export enum PolicyCategory {
  TASKS = 'tasks',
  ORGANIZATION = 'organization',
  BOOKING = 'booking',
  STOCK = 'stock',
  IAM = 'iam',
  EMPLOYEE = 'employee',
  GLOBAL = 'global',
  // Add other categories as needed
}

@Entity()
export class Policies extends AbstractEntity<Policies> {
  @Column({ type: 'varchar', unique: true })
  policyName: string;

  @Column({
    type: 'enum',
    enum: PolicyCategory,
    default: PolicyCategory.GLOBAL,
  })
  category: PolicyCategory;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'json' })
  policyDocument: JSON;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => UserAuth, (user) => user.policies, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;
}
