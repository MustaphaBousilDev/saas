import { AbstractEntity } from '@app/shared';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class RefreshToken extends AbstractEntity<RefreshToken> {
  @Index({ unique: true })
  @Column({ type: 'text' })
  refreshToken: string;

  @Column({ type: 'timestamp' })
  expiry: Date;

  @Column({ type: 'boolean', default: true })
  isActivate: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  lastUsedAt: Date;
}
