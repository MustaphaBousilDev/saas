import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import {
  BrandRepositorySQL,
  HotelRepositorySQL,
  ProductRepositorymySQL,
  StockLocationRepositorySQL,
  SubCategoryRepositorySQL,
  SupplierRepositorySQL,
  TagsRepositorySQL,
  UserRepositorySQL,
} from './products.repository';
import { ProductSTOCK } from '../../models';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { In } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepositorymySQL,
    private readonly userRepository: UserRepositorySQL,
    private readonly subCategoryRepository: SubCategoryRepositorySQL,
    private readonly supplierRepository: SupplierRepositorySQL,
    private readonly brandRepository: BrandRepositorySQL,
    private readonly hotelRepository: HotelRepositorySQL,
    private readonly stockLocationRepository: StockLocationRepositorySQL,
    private readonly tagsRepository: TagsRepositorySQL,
  ) {}
  async create(
    createProductInput: CreateProductInput,
    { _id: userId }: UserInfoDto,
  ) {
    try {
      const {
        subCategory: subDTO,
        supplier: soppDTO,
        brand: brandDTO,
        hotel: hotelDTO,
        location: stockDTO,
        tags: tagsDTO,
        productTransaction: transactionDTO,
        ...otherDTO
      } = createProductInput;
      console.log(
        subDTO,
        soppDTO,
        brandDTO,
        hotelDTO,
        stockDTO,
        tagsDTO,
        transactionDTO,
      );
      const [user, subCategory, supplier, brand, hotel, stockLocation] =
        await Promise.all([
          this.userRepository.findOne({ _id: userId }),
          this.subCategoryRepository.findOne({
            _id: createProductInput.subCategory.id,
          }),
          this.supplierRepository.findOne({
            _id: createProductInput.supplier.id,
          }),
          this.brandRepository.findOne({
            _id: createProductInput.brand.id,
          }),
          this.hotelRepository.findOne({
            _id: createProductInput.hotel.id,
          }),
          this.stockLocationRepository.findOne({
            _id: createProductInput.location.id,
          }),
        ]);

      if (
        !user ||
        !subCategory ||
        !supplier ||
        !brand ||
        !hotel ||
        !stockLocation
      ) {
        throw new Error('Failed to fetch required data.');
      }
      const tagIds = createProductInput.tags.map((tag) => tag.id);
      const tags = await this.tagsRepository.findMany({
        where: { _id: In(tagIds) },
      });
      if (!tags) {
        throw new Error('Failed to fetch tags.');
      }
      const products = new ProductSTOCK({
        ...otherDTO,
        user,
        subCategory,
        brand,
        supplier,
        hotel,
        location: stockLocation,
        tags,
      });
      const createdProduct = await this.productRepository.create(products);
      return createdProduct;
    } catch (error) {
      console.error('Error in creating product:', error);
      return false;
    }
  }

  findAll() {
    return this.productRepository.find({});
  }

  async findOne(_id: any) {
    return this.productRepository.findOne({ _id });
  }

  async update(
    _id: number,
    updateProductInput: UpdateProductInput,
    { _id: userId }: UserInfoDto,
  ) {
    const {
      subCategory: subDTO,
      supplier: soppDTO,
      brand: brandDTO,
      hotel: hotelDTO,
      location: stockDTO,
      tags: tagsDTO,
      ...otherDTO
    } = updateProductInput;
    console.log(tagsDTO);
    const user = await this.userRepository.findOne({
      _id: userId,
    });
    otherDTO['user'] = user;
    if (subDTO && subDTO.id) {
      const subcategory = await this.subCategoryRepository.findOne({
        _id: subDTO.id,
      });
      if (subcategory) {
        otherDTO['subCategory'] = subcategory;
      }
    }
    if (soppDTO && soppDTO.id) {
      const sopplier = await this.supplierRepository.findOne({
        _id: soppDTO.id,
      });
      if (sopplier) {
        otherDTO['supplier'] = sopplier;
      }
    }
    if (brandDTO && brandDTO.id) {
      const brand = await this.brandRepository.findOne({
        _id: brandDTO.id,
      });
      if (brand) {
        otherDTO['brand'] = brand;
      }
    }
    if (hotelDTO && hotelDTO.id) {
      const hotel = await this.hotelRepository.findOne({
        _id: hotelDTO.id,
      });
      if (hotel) {
        otherDTO['hotel'] = hotel;
      }
    }
    if (stockDTO && stockDTO.id) {
      const stockLocation = await this.stockLocationRepository.findOne({
        _id: stockDTO.id,
      });
      if (stockLocation) {
        otherDTO['stockLocation'] = stockLocation;
      }
    }
    if (stockDTO && stockDTO.id) {
      const stockLocation = await this.stockLocationRepository.findOne({
        _id: stockDTO.id,
      });
      if (stockLocation) {
        otherDTO['stockLocation'] = stockLocation;
      }
    }
    return this.productRepository.findOneAndUpdate({ _id }, otherDTO);
  }

  async remove(_id: any) {
    console.log('############# coming to here');
    console.log(_id);
    await this.productRepository.findOneAndDelete({ _id });
  }
}
