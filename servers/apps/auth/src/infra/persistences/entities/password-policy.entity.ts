import { AbstractEntity } from '@app/shared';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserAuth } from './user.entity';

@Entity()
export class PasswordPolicy extends AbstractEntity<PasswordPolicy> {
  @Column({ default: 8 })
  minLength: number;

  @Column({ type: 'boolean' })
  RequireUppercase: boolean;

  @Column({ type: 'boolean' })
  RequireLowercase: boolean;

  @Column({ type: 'boolean' })
  RequireDigits: boolean;

  @Column({ type: 'boolean' })
  RequireSpecialCharacter: boolean;

  @Column()
  ExpiryDate: number;

  @ManyToOne(() => UserAuth, (user) => user.passwordPolicy, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;
}
