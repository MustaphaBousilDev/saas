import { AbstractEntity } from '@app/shared';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserAuth } from './user.entity';

@Entity()
export class FailedLoginAttempts extends AbstractEntity<FailedLoginAttempts> {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  AttemptDatetime: Date;

  @Column({ type: 'int', default: 1 })
  attemptCount: number;

  @ManyToOne(() => UserAuth, (user) => user.failedLoginAttempt, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;
}
