import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OrganizationTASKS } from './organization.entity';
import { UserTASKS } from './users.repository';

@Entity()
@ObjectType() // for add it in schema qraphql
export class HotelTASKS extends AbstractEntity<HotelTASKS> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @ManyToOne(() => OrganizationTASKS, (organization) => organization.hotel, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  organization: OrganizationTASKS;

  @Column()
  @Field() // for graph
  image: string;

  @ManyToOne(() => UserTASKS, (user) => user.hotel, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  user: UserTASKS;
}
