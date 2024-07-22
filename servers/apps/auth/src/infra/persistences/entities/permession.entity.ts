import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/shared';
import { UserAuth } from './user.entity';
import { Role_Has_Resource_Permission } from './role_has_resource_permission';

@Entity()
export class Permission extends AbstractEntity<Permission> {
  @Index({ unique: true })
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => UserAuth, (user) => user.permission, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;

  @OneToMany(() => Role_Has_Resource_Permission, (r_p_r) => r_p_r.permission, {
    cascade: true,
    eager: true,
  })
  RoleResourcePermission: Role_Has_Resource_Permission[];
}
