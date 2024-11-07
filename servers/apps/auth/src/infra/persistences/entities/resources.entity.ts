import { AbstractEntity } from '@app/shared';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { UserAuth } from './user.entity';
import { Role_Has_Resource_Permission } from './role_has_resource_permission';

@Entity()
export class Resource extends AbstractEntity<Resource> {
  @Index({ unique: true })
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'varchar', nullable: true })
  url: string;

  @Column({ type: 'text', nullable: null })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: null, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: null })
  deletedAt: Date;

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
