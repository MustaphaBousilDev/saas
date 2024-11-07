import { AbstractEntity } from '@app/shared';
import { Column, Entity } from 'typeorm';

@Entity()
export class LoginAttempts extends AbstractEntity<LoginAttempts> {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  AttemptDatetime: Date;

  @Column({ type: 'boolean', default: false })
  isSuccesful: boolean;

  @Column('varchar')
  IP_Address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  /*@ManyToOne(() => UserAuth, (user) => user.loginAttempt, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;*/
}
