import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserRES } from './users.mysql.entity';
import { RoomRES } from './rooms.mysql.entity';
import { HotelRES } from './hotel.mysql.entity';

@Entity()
@ObjectType() // for add it in schema qraphql
export class ReservationRES extends AbstractEntity<ReservationRES> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  timestamp: Date;

  @Column()
  @Field() // for graph
  startDate: Date;

  @Column()
  @Field() // for graph
  endDate: Date;

  @Column()
  @Field() // for graph
  invoiceId: string;

  @ManyToOne(() => UserRES, (user) => user.reservation, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  user: UserRES;

  @ManyToOne(() => RoomRES, (room) => room.reservation, {
    nullable: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  room: RoomRES;

  @ManyToOne(() => HotelRES, (hotel) => hotel.reservation, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: HotelRES;
}
