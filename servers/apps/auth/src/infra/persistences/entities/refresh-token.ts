import { AbstractEntity } from '@app/shared';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class RefreshToken extends AbstractEntity<RefreshToken> {
  @Index({ unique: true })
  @Column({ type: 'text' })
  refreshToken: string;

  @Column({ type: 'timestamp' })
  expiry: any;

  @Column({ type: 'boolean' })
  isActivate: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUsedAt: Date;
}
