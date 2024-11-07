import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Tenant } from './tenant.entity';
import { AbstractEntity } from '@app/shared';

export enum StatusSubscription {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELED = 'canceled',
  SUSPENSE = 'suspence',
}

@Entity()
export class SubscriptionTenant extends AbstractEntity<SubscriptionTenant> {
  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({
    type: 'enum',
    enum: StatusSubscription,
    default: StatusSubscription.ACTIVE,
  })
  status: StatusSubscription;

  @OneToOne(() => Tenant, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn() // Use @JoinColumn() without @JoinTable() for one-to-one relationships
  tenant: Tenant;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
