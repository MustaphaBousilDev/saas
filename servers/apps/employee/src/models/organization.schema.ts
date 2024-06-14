import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { HotelEMP } from './hotel.schema';
import { UserEMP } from './users.schema';

@Entity()
@ObjectType() // for add it in schema qraphql
export class OrganizationEMP extends AbstractEntity<OrganizationEMP> {
  @Column({ nullable: true })
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @Column({ nullable: true })
  @Field() // for graph
  logo: string;

  @OneToMany(() => HotelEMP, (hotel) => hotel.organization, {
    cascade: true,
    eager: true,
  })
  hotel: HotelEMP[];

  @ManyToOne(() => UserEMP, (user) => user.organization, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEMP;
}
