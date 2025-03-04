import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dtos/createProduct.dto';
import { GetProductParamsDto } from '../dtos/getProductParams.dto';
import { PatchProductDto } from '../dtos/patchProduct.dto';
import { Product } from '../product.entity';
import { CreateProductProvider } from './create-product.provider';
import { DeleteProductProvider } from './delete-product.provider';
import { GetProductProvider } from './get-product.provider';
import { UpdateProductProvider } from './update-product.provider';
import { EntityManager, Repository } from 'typeorm';

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

  public async updateProductFromOrder(
    product: Product,
    manager?: EntityManager,
  ): Promise<Product> {
    // Use the provided manager if available, otherwise use the repository
    const repository = manager
      ? manager.getRepository(Product)
      : this.productRepository;

    // Find the existing product using the repository
    const existingProduct = await repository.findOne({
      where: { id: product.id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${product.id} not found`);
    }

    // Validate quantity
    if (product.quantity < 0) {
      throw new BadRequestException(
        `Product ${product.id} quantity cannot be negative`,
      );
    }

    // Save the updated product using the repository
    return repository.save(product);
  }
  // public async updateProductFromOrder(product: Product) {
  //   const existingProduct = await this.productRepository.findOne({
  //     where: { id: product.id },
  //   });
  //   if (!existingProduct) {
  //     throw new NotFoundException(`Product with ID ${product.id} not found`);
  //   }

  //   if (product.quantity < 0) {
  //     throw new BadRequestException(
  //       `Product ${product.id} quantity cannot be negative`,
  //     );
  //   }
  //   return this.productRepository.save(product);
  // }
}
