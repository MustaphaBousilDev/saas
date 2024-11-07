import { AbstractEntity } from '@app/shared';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { UserAuth } from './user.entity';

@Entity()
export class Plans extends AbstractEntity<Plans> {
  @Column({
    default: 0,
    scale: 2,
    precision: 10,
    type: 'decimal',
  })
  price: number;

  @Column({ type: 'boolean', default: true })
  @Index()
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  features: Record<string, any>;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  limits: Record<string, any>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => UserAuth, (user) => user.policies, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  createdBy: UserAuth;
}
