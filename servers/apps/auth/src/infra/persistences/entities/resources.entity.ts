import { AbstractEntity } from '@app/shared';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserAuth } from './user.entity';
import { Role_Has_Resource_Permission } from './role_has_resource_permission';

@Entity()
export class Resource extends AbstractEntity<Resource> {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean' })
  isActivate: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserAuth, (user) => user.resource, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserAuth;

  @OneToMany(() => Role_Has_Resource_Permission, (r_p_r) => r_p_r.resource, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  RoleResourcePermission: Role_Has_Resource_Permission[];
}
