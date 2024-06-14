import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { CityORG } from './city.schema';
import { OrganizationORG } from './organization.schema';
import { WifiORG } from './wifi.schema';
import { RoomORG } from './rooms.schema';
import { DepartementORG } from './departement.schema';
import { UserORG } from './users.mysql.entity';

@Entity()
@ObjectType() // for add it in schema qraphql
export class HotelORG extends AbstractEntity<HotelORG> {
  @Column()
  //i am not using type in field because nestjs and graphql pick up on the type of these properties and will use it
  @Field() // for graph
  name: string;

  @Column()
  @Field() // for graph
  address: string;

  @Field(() => [DepartementORG]) // for graph
  @ManyToMany(() => DepartementORG, { cascade: true })
  @JoinTable()
  departments: DepartementORG[];

  @Field(() => OrganizationORG, { nullable: true })
  @ManyToOne(() => OrganizationORG, (organization) => organization.hotel, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  organization: OrganizationORG;

  @Field(() => CityORG, { nullable: true }) // for graph
  @ManyToOne(() => CityORG, (city) => city.hotel, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  city: CityORG;

  @Field(() => [WifiORG], { nullable: true })
  @OneToMany(() => WifiORG, (wifi) => wifi.hotel, {
    cascade: true,
    eager: true,
  })
  wifi: WifiORG[];

  @Column()
  @Field() // for graph
  phone: string;

  @Column()
  @Field() // for graph
  email: string;

  @Column()
  @Field() // for graph
  description: string;

  @Column()
  @Field() // for graph
  image: string;

  @Column()
  @Field() // for graph
  latitude: string;

  @Column({ default: false })
  @Field() // for graph
  status: boolean;

  @Column()
  @Field() // for graph
  longitude: string;

  @Field(() => [RoomORG]) // for graph
  @OneToMany(() => RoomORG, (room) => room.hotel, {
    cascade: true,
    eager: true,
  })
  room: RoomORG[];

  @ManyToOne(() => UserORG, (user) => user.hotel, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserORG;
}
