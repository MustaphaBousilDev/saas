import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserAuth } from './user.entity';

@Entity()
@ObjectType()
export class AccountLockOut extends AbstractEntity<AccountLockOut> {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lockOutDatetime: Date;

  @Column({ type: 'timestamp' })
  unlockDatetime: Date;

  @Column({ type: 'varchar' })
  reason: string;

  @Column()
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
