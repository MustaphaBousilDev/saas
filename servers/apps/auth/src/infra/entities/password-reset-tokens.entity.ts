import { AbstractEntity } from '@app/shared';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserAuth } from './user.entity';

@Entity()
export class PasswordResetToken extends AbstractEntity<PasswordResetToken> {
  @Column({ type: 'text' })
  token: string;

  @Column({ type: 'timestamp' })
  expiryTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  cretatedAt: Date;

  @ManyToOne(() => UserAuth, (user) => user.resetPasswordToken, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;
}
