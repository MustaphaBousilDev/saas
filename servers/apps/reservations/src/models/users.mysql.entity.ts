import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { ReservationRES } from './reservation.mysql.entity';
import { HotelRES } from './hotel.mysql.entity';
import { OrganizationRES } from './organization.mysql.entity';
import { RoomRES } from './rooms.mysql.entity';

@Entity()
@ObjectType()
export class UserRES extends AbstractEntity<UserRES> {
  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @OneToMany(() => ReservationRES, (reservation) => reservation.user, {
    cascade: true,
    eager: true,
  })
  reservation: ReservationRES[];

  @OneToMany(() => RoomRES, (room) => room.user, {
    cascade: true,
    eager: true,
  })
  room: RoomRES[];

  @OneToMany(() => HotelRES, (hotel) => hotel.user, {
    cascade: true,
    eager: true,
  })
  hotel: HotelRES[];

  @OneToMany(() => OrganizationRES, (org) => org.user, {
    cascade: true,
    eager: true,
  })
  organization: OrganizationRES[];
}
