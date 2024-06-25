import { AbstractEntity } from '@app/shared';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Role_Has_Resource_Permission } from './role_has_resource_permission';
import { UserAuth } from './user.entity';

@Entity()
export class Role extends AbstractEntity<Role> {
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

  @ManyToOne(() => UserAuth, (user) => user.rolesCreated, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;

  @OneToMany(() => Role_Has_Resource_Permission, (r_p_r) => r_p_r.role, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  RoleResourcePermission: Role_Has_Resource_Permission[];
}
