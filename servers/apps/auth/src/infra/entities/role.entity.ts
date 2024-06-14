import { AbstractEntity } from '@app/shared';
import { Column, Entity, OneToMany } from 'typeorm';
import { Role_Has_Resource_Permission } from './role_has_resource_permission';

@Entity()
export class Role extends AbstractEntity<Role> {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Role_Has_Resource_Permission, (r_p_r) => r_p_r.role, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  RoleResourcePermission: Role_Has_Resource_Permission[];
}
