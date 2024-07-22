import { AbstractEntity } from '@app/shared';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserAuth } from './user.entity';
import { Role } from './role.entity';
import { Permission } from './permession.entity';
import { Resource } from './resources.entity';

@Entity()
export class Role_Has_Resource_Permission extends AbstractEntity<Role_Has_Resource_Permission> {
  /*@Column({ type: 'varchar' })
  name: string;*/

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActivate: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null })
  updatedAt: Date;

  @Column({ type: 'timestamp', default: null })
  deletedAt: Date;

  @ManyToOne(() => UserAuth, (user) => user.resource, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;

  @ManyToOne(() => Role, (role) => role.RoleResourcePermission, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  role: Role;

  @ManyToOne(
    () => Permission,
    (permission) => permission.RoleResourcePermission,
    {
      nullable: true,
      orphanedRowAction: 'delete',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  permission: Permission;

  @ManyToOne(() => Resource, (resource) => resource.RoleResourcePermission, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  resource: Resource;

  @ManyToOne(() => UserAuth, (user) => user.resourceCreated, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  usercreated: UserAuth;
}
