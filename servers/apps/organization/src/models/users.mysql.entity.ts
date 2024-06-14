import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { WifiORG } from './wifi.schema';
import { RoomORG } from './rooms.schema';
import { OrganizationORG } from './organization.schema';
import { CityORG } from './city.schema';
import { DepartementORG } from './departement.schema';
import { HotelORG } from './hotel.schema';

@Entity()
@ObjectType()
export class UserORG extends AbstractEntity<UserORG> {
  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Field(() => [WifiORG], { nullable: true })
  @OneToMany(() => WifiORG, (wifi) => wifi.user, {
    cascade: true,
    eager: true,
  })
  wifi: WifiORG[];

  @Field(() => [RoomORG], { nullable: true })
  @OneToMany(() => RoomORG, (room) => room.user, {
    cascade: true,
    eager: true,
  })
  room: RoomORG[];

  @Field(() => [OrganizationORG], { nullable: true })
  @OneToMany(() => OrganizationORG, (organization) => organization.user, {
    cascade: true,
    eager: true,
  })
  organization: OrganizationORG[];

  @Field(() => [CityORG], { nullable: true })
  @OneToMany(() => CityORG, (city) => city.user, {
    cascade: true,
    eager: true,
  })
  city: CityORG[];

  @Field(() => [DepartementORG], { nullable: true })
  @OneToMany(() => DepartementORG, (departement) => departement.user, {
    cascade: true,
    eager: true,
  })
  departement: DepartementORG[];

  @Field(() => [HotelORG], { nullable: true })
  @OneToMany(() => HotelORG, (hotel) => hotel.user, {
    cascade: true,
    eager: true,
  })
  hotel: HotelORG[];
}
