import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { OrganizationEMP } from './organization.schema';
import { DepartementEMP } from './departement.schema';
import { UserEMP } from './users.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class HotelEMP extends AbstractEntity<HotelEMP> {
  @Column({ nullable: true })
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @ManyToMany(() => DepartementEMP, (departments) => departments.hotels)
  @JoinTable()
  departments: DepartementEMP[];

  @ManyToOne(() => OrganizationEMP, (organization) => organization.hotel, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  organization: OrganizationEMP;

  @Column()
  @Field() // for graph
  image: string;

  @ManyToOne(() => UserEMP, (user) => user.hotel, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEMP;
}
