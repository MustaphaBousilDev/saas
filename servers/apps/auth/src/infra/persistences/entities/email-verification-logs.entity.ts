import { AbstractEntity } from '@app/shared';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserAuth } from './user.entity';

export enum VerifyEmailStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  EXPIRED = 'expired',
}
@Entity()
export class VerificationEmailLogs extends AbstractEntity<VerificationEmailLogs> {
  @Column({ type: 'text' })
  token: string;

  @Column({
    type: 'enum',
    enum: VerifyEmailStatus,
    default: VerifyEmailStatus.PENDING,
  })
  status: VerifyEmailStatus;

  @OneToOne(() => UserAuth)
  @JoinColumn()
  user: UserAuth;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
