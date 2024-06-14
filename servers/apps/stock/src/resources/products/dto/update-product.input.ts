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
@InputType()
export class UpdateProductInput {
  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  name?: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  description?: string;

  @IsOptional()
  @Field(() => SubCategoryInputID, { nullable: true })
  @IsNotEmpty()
  subCategory?: SubCategoryInputID;

  @IsOptional()
  @Field({ nullable: true })
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @Field({ nullable: true })
  @IsNumber()
  price?: number;

  @IsOptional()
  @Field(() => SupplierIDDtoInput, { nullable: true })
  @IsNotEmpty()
  supplier?: SupplierIDDtoInput;

  @IsOptional()
  @Field(() => [SupplierIDDtoInput], { nullable: true })
  @IsNotEmpty()
  tags?: SupplierIDDtoInput[];

  @IsOptional()
  @Field(() => BrandInputID, { nullable: true })
  @IsNotEmpty()
  brand?: BrandInputID;

  @IsOptional()
  @Field({ nullable: true })
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @Field(() => HotelIDDtoInput, { nullable: true })
  @IsNotEmpty()
  hotel?: HotelIDDtoInput;

  @IsOptional()
  @Field(() => StockLocationIDDtoInput, { nullable: true })
  @IsNotEmpty()
  location?: StockLocationIDDtoInput;
}
