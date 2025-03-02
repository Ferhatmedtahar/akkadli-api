import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dtos/createProduct.dto';
import { GetProductParamsDto } from '../dtos/getProductParams.dto';
import { PatchProductDto } from '../dtos/patchProduct.dto';
import { Product } from '../product.entity';
import { CreateProductProvider } from './create-product.provider';
import { DeleteProductProvider } from './delete-product.provider';
import { GetProductProvider } from './get-product.provider';
import { UpdateProductProvider } from './update-product.provider';

@Injectable()
export class ProductsService {
  constructor(
    /**inject create product provider */
    private readonly createProductProvider: CreateProductProvider,

    /* inject get product provider*/
    private readonly getProductProvider: GetProductProvider,

    /**inject update product provider */
    private readonly updateProductProvider: UpdateProductProvider,

    /**inject delete product provider */
    private readonly deleteProductProvider: DeleteProductProvider,
  ) {}

  public async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.createProductProvider.createProductProvider(
      createProductDto,
    );
  }

  public async getProductById(getProductParamsDto: GetProductParamsDto) {
    return this.getProductProvider.getProductById(getProductParamsDto);
  }
  public async findAll() {
    return this.getProductProvider.findAll();
  }
  public async getProductByIdWithRelations(
    getProductParamsDto: GetProductParamsDto,
  ) {
    return this.getProductProvider.getProductByIdWithRelations(
      getProductParamsDto,
    );
  }
  public async updateProduct(
    @Param() getProductParamsDto: GetProductParamsDto,
    @Body() updateProductDto: PatchProductDto,
  ) {
    return this.updateProductProvider.updateProduct(
      getProductParamsDto,
      updateProductDto,
    );
  }
  public async deleteProduct(
    @Param() getProductParamsDto: GetProductParamsDto,
  ) {
    return this.deleteProductProvider.deleteProduct(getProductParamsDto);
  }
}
