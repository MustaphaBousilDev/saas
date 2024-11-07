import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserAuth } from './user.entity';

@Entity()
@ObjectType()
export class AccountLockOut extends AbstractEntity<AccountLockOut> {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lockOutDatetime: Date;

  @Column({ type: 'timestamp', nullable: true })
  unlockDatetime: Date;

  @Column({ type: 'varchar', length: 255 })
  lockoutReason: string;

  @Column({ select: false }) //select: false is for exclude from select queries by default
  @Field()
  // i dont want to add Field into password , because password is sensitive data
  password: string;

  @ManyToOne(() => UserAuth, (user) => user.accountLockOut, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;
}
