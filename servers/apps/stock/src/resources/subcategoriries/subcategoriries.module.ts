import { Module } from '@nestjs/common';
import { SubcategoririesService } from './subcategoriries.service';
import { SubcategoririesResolver } from './subcategoriries.resolver';
import { DatabaseModulemySQL } from '@app/shared';
import {
  CategorySTOCK,
  ProductSTOCK,
  SubCategorySTOCK,
  UserSTOCK,
} from '../../models';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import {
  CategoryRepositorymySQL,
  SubCategoryRepositorymySQL,
  UserRepositorymySQL,
} from './subcategories.repository';

@Module({
  imports: [
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([
      UserSTOCK,
      CategorySTOCK,
      SubCategorySTOCK,
      ProductSTOCK,
    ]),
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    SubcategoririesResolver,
    SubcategoririesService,
    SubCategoryRepositorymySQL,
    CategoryRepositorymySQL,
    UserRepositorymySQL,
  ],
})
export class SubcategoririesModule {}
