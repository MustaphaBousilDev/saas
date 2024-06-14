import { Module } from '@nestjs/common';
import { DatabaseModulemySQL, LoggerModule } from '@app/shared';
import { CacheModule } from '@nestjs/cache-manager';
import {
  CategorySTOCK,
  DepartementSTOCK,
  EmployeeSTOCK,
  HotelSTOCK,
  OrganizationSTOCK,
  ProductSTOCK,
  ProductDetailsSTOCK,
  ProductImageSTOCK,
  StockLocationSTOCK,
  StockMovementSTOCK,
  StockTransactionSTOCK,
  SubCategorySTOCK,
  SuppliersSTOCK,
  TagsSTOCK,
  UserSTOCK,
} from './models';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { BrandsModule } from './resources/brands/brands.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { SubcategoririesModule } from './resources/subcategoriries/subcategoriries.module';
import { SuppliersModule } from './resources/suppliers/suppliers.module';
import { TagsModule } from './resources/tags/tags.module';
import { ProductsModule } from './resources/products/products.module';
import { OrganizationController } from './stock.controller';
import { UserRepositorySQL } from './resources/users/users.repository';
import { CacheService } from './cache/cache.service';

@Module({
  imports: [
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([
      CategorySTOCK,
      SubCategorySTOCK,
      DepartementSTOCK,
      EmployeeSTOCK,
      HotelSTOCK,
      OrganizationSTOCK,
      ProductSTOCK,
      ProductDetailsSTOCK,
      ProductImageSTOCK,
      StockLocationSTOCK,
      StockMovementSTOCK,
      StockTransactionSTOCK,
      SubCategorySTOCK,
      SuppliersSTOCK,
      TagsSTOCK,
      UserSTOCK,
    ]),
    CacheModule.register({
      isGlobal: true,
      ttl: 1000,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    LoggerModule,
    ProductsModule,
    BrandsModule,
    CategoriesModule,
    SubcategoririesModule,
    SuppliersModule,
    TagsModule,
  ],
  controllers: [OrganizationController],
  providers: [UserRepositorySQL, CacheService],
})
export class StockModule {}
