import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { HotelRES } from './hotel.mysql.entity';
import { UserRES } from './users.mysql.entity';

@Entity()
@ObjectType() // for add it in schema qraphql
export class OrganizationRES extends AbstractEntity<OrganizationRES> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @Column()
  @Field() // for graph
  logo: string;

  @OneToMany(() => HotelRES, (hotel) => hotel.organization, {
    cascade: true,
    eager: true,
  })
  hotel: HotelRES[];

  @Field(() => UserRES, { nullable: true })
  @ManyToOne(() => UserRES, (user) => user.organization, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserRES;
}
