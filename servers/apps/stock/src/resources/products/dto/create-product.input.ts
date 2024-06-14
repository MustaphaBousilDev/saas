import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SubCategoryInputID } from '../../subcategoriries/dto/create-subcategoriry.input';
import { SupplierIDDtoInput } from '../../suppliers/dto/create-supplier.input';
import { BrandInputID } from '../../brands/dto/create-brand.input';
import { HotelIDDtoInput } from '../../hotels/hotel.dto';
import { StockLocationIDDtoInput } from '../../stockLocation/stock-location.dto';
import { TransactionIDDtoInput } from '../../transactions/transaction.dto';
@InputType()
export class CreateProductInput {
  @Field(() => SubCategoryInputID)
  @IsNotEmpty()
  subCategory: SubCategoryInputID;

  @Field(() => SupplierIDDtoInput)
  @IsNotEmpty()
  supplier: SupplierIDDtoInput;

  @Field(() => BrandInputID)
  @IsNotEmpty()
  brand: BrandInputID;

  @Field(() => HotelIDDtoInput)
  @IsNotEmpty()
  hotel: HotelIDDtoInput;

  @Field(() => StockLocationIDDtoInput)
  @IsNotEmpty()
  location: StockLocationIDDtoInput;

  @Field(() => [SupplierIDDtoInput])
  @IsNotEmpty()
  tags: SupplierIDDtoInput[];

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsNumber()
  quantity: number;

  @Field()
  @IsNumber()
  price: number;

  @Field()
  @IsBoolean()
  status: boolean;

  @Field(() => TransactionIDDtoInput, { nullable: true })
  @IsOptional()
  productTransaction: TransactionIDDtoInput;
}
