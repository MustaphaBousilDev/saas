import { AbstractEntity } from '@app/shared';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserAuth } from './user.entity';

@Entity()
export class PasswordPolicy extends AbstractEntity<PasswordPolicy> {
  @Column({ default: 8 })
  minLength: number;

  @Column({ type: 'boolean', default: false })
  RequireUppercase: boolean;

  @Column({ type: 'boolean', default: false })
  RequireLowercase: boolean;

  @Column({ type: 'boolean', default: false })
  RequireDigits: boolean;

  @Column({ type: 'boolean', default: false })
  RequireSpecialCharacter: boolean;

  @Column({ type: 'int', default: 90 })
  ExpiryDate: number;

  @ManyToOne(() => UserAuth, (user) => user.passwordPolicy, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;
}
