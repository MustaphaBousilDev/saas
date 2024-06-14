import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { DepartementSTOCK } from './departement.schema';
import { HotelSTOCK } from './hotel.schema';
import { OrganizationSTOCK } from './organization.schema';
import { BrandSTOCK } from './brands.schema';
import { CategorySTOCK } from './categories.schema';
import { SubCategorySTOCK } from './subcategories.schema';
import { EmployeeSTOCK } from './employe.responsable.schema';
import { SuppliersSTOCK } from './suppliers.schema';
import { ProductSTOCK } from './products.schema';
import { StockLocationSTOCK } from './stock.location.schema';
import { StockMovementSTOCK } from './stock.movment.schema';
import { StockTransactionSTOCK } from './stock.transaction.schema';
import { TagsSTOCK } from './tags.schema';

@Entity()
@ObjectType()
export class UserSTOCK extends AbstractEntity<UserSTOCK> {
  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Field(() => [DepartementSTOCK], { nullable: true })
  @OneToMany(() => DepartementSTOCK, (departement) => departement.user, {
    cascade: true,
    eager: true,
  })
  departements: DepartementSTOCK[];

  @Field(() => [HotelSTOCK], { nullable: true })
  @OneToMany(() => HotelSTOCK, (hotel) => hotel.user, {
    cascade: true,
    eager: true,
  })
  hotel: HotelSTOCK[];

  @Field(() => [OrganizationSTOCK], { nullable: true })
  @OneToMany(() => OrganizationSTOCK, (organization) => organization.user, {
    cascade: true,
    eager: true,
  })
  organization: OrganizationSTOCK[];

  @Field(() => [ProductSTOCK], { nullable: true })
  @OneToMany(() => ProductSTOCK, (product) => product.user, {
    cascade: true,
    eager: true,
  })
  product: ProductSTOCK[];

  @Field(() => [BrandSTOCK], { nullable: true })
  @OneToMany(() => BrandSTOCK, (brand) => brand.user, {
    cascade: true,
    eager: true,
  })
  brand: BrandSTOCK[];

  @Field(() => [CategorySTOCK], { nullable: true })
  @OneToMany(() => CategorySTOCK, (category) => category.user, {
    cascade: true,
    eager: true,
  })
  category: CategorySTOCK[];

  @Field(() => [SubCategorySTOCK], { nullable: true })
  @OneToMany(() => SubCategorySTOCK, (subcat) => subcat.user, {
    cascade: true,
    eager: true,
  })
  subcategory: SubCategorySTOCK[];

  @Field(() => [EmployeeSTOCK], { nullable: true })
  @OneToMany(() => EmployeeSTOCK, (emp) => emp.user, {
    cascade: true,
    eager: true,
  })
  employee: EmployeeSTOCK[];

  @Field(() => [SuppliersSTOCK], { nullable: true })
  @OneToMany(() => SuppliersSTOCK, (sup) => sup.user, {
    cascade: true,
    eager: true,
  })
  suplies: SuppliersSTOCK[];

  @Field(() => [StockLocationSTOCK], { nullable: true })
  @OneToMany(() => StockLocationSTOCK, (stock) => stock.user, {
    cascade: true,
    eager: true,
  })
  stockLocation: StockLocationSTOCK[];

  @Field(() => [StockMovementSTOCK], { nullable: true })
  @OneToMany(() => StockMovementSTOCK, (stock) => stock.user, {
    cascade: true,
    eager: true,
  })
  movmentStock: StockMovementSTOCK[];

  @Field(() => [StockTransactionSTOCK], { nullable: true })
  @OneToMany(() => StockTransactionSTOCK, (stock) => stock.user, {
    cascade: true,
    eager: true,
  })
  stockTransaction: StockTransactionSTOCK[];

  @Field(() => [TagsSTOCK], { nullable: true })
  @OneToMany(() => TagsSTOCK, (tags) => tags.user, {
    cascade: true,
    eager: true,
  })
  tags: TagsSTOCK[];
}
