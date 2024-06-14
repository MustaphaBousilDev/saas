import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { HotelORG } from './hotel.schema';
import { UserORG } from './users.mysql.entity';

@Entity()
@ObjectType() // for add it in schema qraphql
export class CityORG extends AbstractEntity<CityORG> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @OneToMany(() => HotelORG, (room) => room.city, {
    cascade: true,
    eager: true,
  })
  hotel: HotelORG[];

  @ManyToOne(() => UserORG, (user) => user.city, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserORG;
}
