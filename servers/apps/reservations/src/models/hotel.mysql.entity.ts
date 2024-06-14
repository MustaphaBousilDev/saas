import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { RoomRES } from './rooms.mysql.entity';
import { OrganizationRES } from './organization.mysql.entity';
import { ReservationRES } from './reservation.mysql.entity';
import { UserRES } from './users.mysql.entity';
@Entity()
@ObjectType() // for add it in schema qraphql
export class HotelRES extends AbstractEntity<HotelRES> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @Column()
  @Field() // for graph
  image: string;

  @OneToMany(() => RoomRES, (room) => room.hotel, {
    cascade: true,
    eager: true,
  })
  room: RoomRES[];

  @ManyToOne(() => OrganizationRES, (organization) => organization.hotel, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  organization: OrganizationRES;

  @OneToMany(() => ReservationRES, (reservation) => reservation.hotel, {
    cascade: true,
    eager: true,
  })
  reservation: ReservationRES[];

  @ManyToOne(() => UserRES, (user) => user.hotel, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserRES;
}
