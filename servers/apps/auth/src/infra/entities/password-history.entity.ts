import { AbstractEntity } from '@app/shared';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { UserAuth } from './user.entity';

@Entity()
export class PasswordHistory extends AbstractEntity<PasswordHistory> {
  @Index()
  @Column('varchar', { unique: true })
  passwordHash: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  changeDateTime: Date;

  @ManyToOne(() => UserAuth, (user) => user.passwordHistory, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;
}
