import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Tenant } from './tenant.entity';
import { AbstractEntity } from '@app/shared';

@Entity()
export class FreeTier extends AbstractEntity<FreeTier> {
  @OneToOne(() => Tenant, { nullable: true })
  @JoinColumn()
  tenant: Tenant;

  @Column()
  expiryDate: string;

  @Column({ default: false })
  isExpired: boolean;

  @Column()
  token: string;
}
