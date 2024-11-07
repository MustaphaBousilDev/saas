import { AbstractEntity } from '@app/shared/database';
import { Column, Entity, JoinColumn, JoinTable, OneToOne } from 'typeorm';
import { UserAuth } from './user.entity';

@Entity()
export class Tenant extends AbstractEntity<Tenant> {
  @Column({
    unique: true,
  })
  name: string;

  @Column()
  address: string;

  @Column()
  contact_number: string;

  @Column({
    default: null,
  })
  domain: string;

  @OneToOne(() => UserAuth, { nullable: true })
  @JoinColumn()
  user?: UserAuth;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({
    default: true,
  })
  active: boolean;
}
