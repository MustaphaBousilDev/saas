import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { HotelTASKS } from './hotel.entity';
import { UserTASKS } from './users.repository';

@Entity()
@ObjectType() // for add it in schema qraphql
export class OrganizationTASKS extends AbstractEntity<OrganizationTASKS> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @Column()
  @Field() // for graph
  logo: string;

  @OneToMany(() => HotelTASKS, (hotel) => hotel.organization, {
    cascade: true,
    eager: true,
  })
  hotel: HotelTASKS[];

  @ManyToOne(() => UserTASKS, (user) => user.organization, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  user: UserTASKS;
}
