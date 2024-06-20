import { AbstractEntity } from '@app/shared/database';
import { Column, Entity } from 'typeorm';

@Entity()
export class Tenant extends AbstractEntity<Tenant> {
  @Column()
  name: string;
}
