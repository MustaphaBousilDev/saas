import { AbstractRepositorymySQL } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  BrandSTOCK,
  HotelSTOCK,
  ProductSTOCK,
  StockLocationSTOCK,
  SubCategorySTOCK,
  SuppliersSTOCK,
  TagsSTOCK,
  UserSTOCK,
} from '../../models';

@Injectable()
export class ProductRepositorymySQL extends AbstractRepositorymySQL<ProductSTOCK> {
  protected readonly logger = new Logger(ProductRepositorymySQL.name);

  constructor(
    @InjectRepository(ProductSTOCK)
    ProductRepository: Repository<ProductSTOCK>,
    entityManager: EntityManager,
  ) {
    super(ProductRepository, entityManager);
  }
}

@Injectable()
export class UserRepositorySQL extends AbstractRepositorymySQL<UserSTOCK> {
  protected readonly logger = new Logger(UserRepositorySQL.name);

  constructor(
    @InjectRepository(UserSTOCK)
    UserRepositorymySQL: Repository<UserSTOCK>,
    entityManager: EntityManager,
  ) {
    super(UserRepositorymySQL, entityManager);
  }
}

@Injectable()
export class SubCategoryRepositorySQL extends AbstractRepositorymySQL<SubCategorySTOCK> {
  protected readonly logger = new Logger(SubCategoryRepositorySQL.name);

  constructor(
    @InjectRepository(SubCategorySTOCK)
    SubCategoryRepositorymySQL: Repository<SubCategorySTOCK>,
    entityManager: EntityManager,
  ) {
    super(SubCategoryRepositorymySQL, entityManager);
  }
}

@Injectable()
export class SupplierRepositorySQL extends AbstractRepositorymySQL<SuppliersSTOCK> {
  protected readonly logger = new Logger(SupplierRepositorySQL.name);

  constructor(
    @InjectRepository(SuppliersSTOCK)
    suplierRepository: Repository<SuppliersSTOCK>,
    entityManager: EntityManager,
  ) {
    super(suplierRepository, entityManager);
  }
}

@Injectable()
export class BrandRepositorySQL extends AbstractRepositorymySQL<BrandSTOCK> {
  protected readonly logger = new Logger(BrandRepositorySQL.name);

  constructor(
    @InjectRepository(BrandSTOCK)
    BrandRepositorymySQL: Repository<BrandSTOCK>,
    entityManager: EntityManager,
  ) {
    super(BrandRepositorymySQL, entityManager);
  }
}

@Injectable()
export class HotelRepositorySQL extends AbstractRepositorymySQL<HotelSTOCK> {
  protected readonly logger = new Logger(HotelRepositorySQL.name);

  constructor(
    @InjectRepository(HotelSTOCK)
    HotelRepositorymySQL: Repository<HotelSTOCK>,
    entityManager: EntityManager,
  ) {
    super(HotelRepositorymySQL, entityManager);
  }
}

@Injectable()
export class StockLocationRepositorySQL extends AbstractRepositorymySQL<StockLocationSTOCK> {
  protected readonly logger = new Logger(StockLocationRepositorySQL.name);

  constructor(
    @InjectRepository(StockLocationSTOCK)
    StockLocationRepository: Repository<StockLocationSTOCK>,
    entityManager: EntityManager,
  ) {
    super(StockLocationRepository, entityManager);
  }
}

@Injectable()
export class TagsRepositorySQL extends AbstractRepositorymySQL<TagsSTOCK> {
  protected readonly logger = new Logger(TagsRepositorySQL.name);

  constructor(
    @InjectRepository(TagsSTOCK)
    TagsRepositorymySQL: Repository<TagsSTOCK>,
    entityManager: EntityManager,
  ) {
    super(TagsRepositorymySQL, entityManager);
  }
}
