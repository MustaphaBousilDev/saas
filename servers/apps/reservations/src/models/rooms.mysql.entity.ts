import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { HotelRES } from './hotel.mysql.entity';
import { ReservationRES } from './reservation.mysql.entity';
import { UserRES } from './users.mysql.entity';

@Entity()
@ObjectType() // for add it in schema qraphql
export class RoomRES extends AbstractEntity<RoomRES> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  roomNumber: number;

  @Column()
  @Field() // for graph
  type: string; // single, double, suite

  @Column()
  @Field()
  price: number;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  isAvailable: boolean;

  @ManyToOne(() => HotelRES, (hotel) => hotel.room, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: HotelRES;

  @Column()
  @Field() // for graph
  image: string;

  @ManyToOne(() => UserRES, (user) => user.room, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserRES;

  @OneToMany(() => ReservationRES, (reservation) => reservation.room, {
    cascade: true,
    eager: true,
  })
  reservation: ReservationRES[];
}
