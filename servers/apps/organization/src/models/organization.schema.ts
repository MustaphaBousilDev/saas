import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { HotelORG } from './hotel.schema';
import { UserORG } from './users.mysql.entity';

@Entity()
@ObjectType() // for add it in schema qraphql
export class OrganizationORG extends AbstractEntity<OrganizationORG> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field({ nullable: true }) // for graph
  name: string;

  @Column()
  @Field({ nullable: true })
  phone1: string;

  @Column()
  @Field({ nullable: true })
  phone2: string;

  @Column()
  @Field({ nullable: true }) // for graph
  email: string;

  @Column()
  @Field({ nullable: true })
  website: string;

  @Column()
  @Field({ nullable: true })
  description: string;

  @Column()
  @Field({ nullable: true })
  logo: string;

  @ManyToOne(() => UserORG, (user) => user.organization, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserORG;

  @OneToMany(() => HotelORG, (hotel) => hotel.organization, {
    cascade: true,
    eager: true,
  })
  hotel: HotelORG[];
}
