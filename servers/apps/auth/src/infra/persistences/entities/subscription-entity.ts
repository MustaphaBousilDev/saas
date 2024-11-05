import { Column, Entity, JoinTable, OneToOne } from 'typeorm';
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

  @OneToOne(() => Tenant)
  @JoinTable()
  tenant: Tenant;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
