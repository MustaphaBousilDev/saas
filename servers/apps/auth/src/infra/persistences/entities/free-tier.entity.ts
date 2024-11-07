import { AbstractEntity } from '@app/shared';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserAuth } from './user.entity';

@Entity()
export class FreeTier extends AbstractEntity<FreeTier> {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  AttemptDatetime: Date;

  @Column({ type: 'int' })
  count: number;

  @ManyToOne(() => UserAuth, (user) => user.loginAttempt, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;
}
