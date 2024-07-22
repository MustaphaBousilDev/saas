import { AbstractEntity } from '@app/shared';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { UserAuth } from './user.entity';

@Entity()
export class PasswordResetToken extends AbstractEntity<PasswordResetToken> {
  @Index({ unique: true })
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
