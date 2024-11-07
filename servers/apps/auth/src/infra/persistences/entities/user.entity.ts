import { AbstractEntity } from '@app/shared';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserDetailAuth } from './user-details.entity';
import { AccountLockOut } from './account-lockout.entity';
import { PasswordHistory } from './password-history.entity';
import { PasswordResetToken } from './password-reset-tokens.entity';
import { Role } from './role.entity';
import { Policies } from './policy.entity';
import { FailedLoginAttempts } from './failed-login.attempts';
import { PasswordPolicy } from './password-policy.entity';
import { Permission } from './permession.entity';
import { Resource } from './resources.entity';

@Entity()
export class UserAuth extends AbstractEntity<UserAuth> {
  @Index({ unique: true })
  @Column('varchar', { unique: true })
  email: string;

  @Index({ unique: true })
  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar')
  password: string;

  @Column('boolean', { default: true })
  status: boolean;

  @Column('text', { default: null })
  refreshToken: string;

  @OneToOne(() => UserDetailAuth, { nullable: true })
  @JoinColumn()
  userDetails?: UserDetailAuth;

  @OneToMany(() => AccountLockOut, (accountLockout) => accountLockout.user, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  accountLockOut?: AccountLockOut[];

  @OneToMany(
    () => FailedLoginAttempts,
    (failedLoginAttempt) => failedLoginAttempt.user,
    {
      cascade: true,
      eager: true,
      nullable: true,
    },
  )
  failedLoginAttempt?: FailedLoginAttempts[];

  @OneToMany(() => PasswordHistory, (passwordHistory) => passwordHistory.user, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  passwordHistory?: PasswordHistory[];

  @OneToMany(() => PasswordResetToken, (passwordReset) => passwordReset.user, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  resetPasswordToken?: PasswordResetToken[];

  @OneToMany(() => Policies, (policy) => policy.createdBy, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  policies?: Policies[];

  @OneToMany(() => PasswordPolicy, (policy) => policy.user, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  passwordPolicy?: PasswordPolicy[];

  @OneToMany(() => Permission, (policy) => policy.user, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  permission?: Permission[];

  @OneToMany(() => Resource, (resource) => resource.user, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  resource?: Resource[];

  @OneToMany(() => Resource, (resource) => resource.user, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  resourceCreated?: Resource[];

  @OneToMany(() => Role, (role) => role.user, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  rolesCreated?: Role[];

  @ManyToMany(() => Role, { cascade: true, nullable: true })
  @JoinTable()
  roles?: Role[];

  //@OneToOne(() => RefreshToken, { nullable: true })
  //@JoinColumn()
  //refreshToken?: RefreshToken;

  @Column({ type: 'timestamp', nullable: true })
  lastDateUseRefresh: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastDateUpdateRefresh: Date;
}
