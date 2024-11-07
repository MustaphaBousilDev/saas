import { AbstractEntity } from '@app/shared/database';
import { Column, Entity, JoinTable, OneToOne } from 'typeorm';
import { UserAuth } from './user.entity';

@Entity()
export class Subscription extends AbstractEntity<Subscription> {
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
  @JoinTable()
  user?: UserAuth;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
