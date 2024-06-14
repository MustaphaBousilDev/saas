import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { OrganizationTASKS } from './organization.entity';
import { DepartementTASKS } from './departement.entity';
import { HotelTASKS } from './hotel.entity';

@Entity()
@ObjectType()
export class UserTASKS extends AbstractEntity<UserTASKS> {
  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Field(() => [OrganizationTASKS], { nullable: true })
  @OneToMany(() => OrganizationTASKS, (organization) => organization.user, {
    cascade: true,
    eager: true,
  })
  organization: OrganizationTASKS[];

  @Field(() => [DepartementTASKS], { nullable: true })
  @OneToMany(() => DepartementTASKS, (departement) => departement.user, {
    cascade: true,
    eager: true,
  })
  departement: DepartementTASKS[];

  @Field(() => [HotelTASKS], { nullable: true })
  @OneToMany(() => HotelTASKS, (hotel) => hotel.user, {
    cascade: true,
    eager: true,
  })
  hotel: HotelTASKS[];
}
