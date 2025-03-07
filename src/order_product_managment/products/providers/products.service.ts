import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/createProduct.dto';
import { GetProductParamsDto } from '../dtos/getProductParams.dto';
import { GetProductsDto } from '../dtos/getProducts.dto';
import { PatchProductDto } from '../dtos/patchProduct.dto';
import { Product } from '../product.entity';
import { CreateProductProvider } from './create-product.provider';
import { DeleteProductProvider } from './delete-product.provider';
import { GetProductProvider } from './get-product.provider';
import { UpdateProductProvider } from './update-product.provider';

@Injectable()
export class ProductsService {
  constructor(
    /**inject products repository */
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    /**inject create product provider */
    private readonly createProductProvider: CreateProductProvider,

    /* inject get product provider*/
    private readonly getProductProvider: GetProductProvider,

    /**inject update product provider */
    private readonly updateProductProvider: UpdateProductProvider,

    /**inject delete product provider */
    private readonly deleteProductProvider: DeleteProductProvider,
  ) {}

  public async createProduct(
    createProductDto: CreateProductDto,
    userId: number,
  ) {
    return await this.createProductProvider.createProductProvider(
      createProductDto,
      userId,
    );
  }

  public async getProductById(
    getProductParamsDto: GetProductParamsDto,
    userId: number,
  ) {
    return this.getProductProvider.getProductById(getProductParamsDto, userId);
  }
  public async findAll(productsQuery: GetProductsDto, userId: number) {
    return this.getProductProvider.findAll(productsQuery, userId);
  }
  public async getProductByIdWithRelations(
    getProductParamsDto: GetProductParamsDto,
    userId: number,
  ) {
    return this.getProductProvider.getProductByIdWithRelations(
      getProductParamsDto,
      userId,
    );
  }
  public async updateProduct(
    getProductParamsDto: GetProductParamsDto,
    updateProductDto: PatchProductDto,
    userId: number,
  ) {
    return this.updateProductProvider.updateProduct(
      getProductParamsDto,
      updateProductDto,
      userId,
    );
  }

  public async updateProductFromOrder(
    product: Product,
    userId: number,
    manager?: EntityManager,
  ): Promise<Product> {
    return this.updateProductProvider.updateProductFromOrder(
      product,
      userId,
      manager,
    );
  }

  public async deleteProduct(
    getProductParamsDto: GetProductParamsDto,
    userId: number,
  ) {
    return this.deleteProductProvider.deleteProduct(
      getProductParamsDto,
      userId,
    );
  }
}
