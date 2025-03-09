import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { UsersService } from 'src/users/providers/users.service';
import { EntityManager, Repository } from 'typeorm';
import { GetProductParamsDto } from '../dtos/getProductParams.dto';
import { PatchProductDto } from '../dtos/patchProduct.dto';
import { Product } from '../product.entity';

@Injectable()
export class UpdateProductProvider {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject products repository */
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    /**inject order product service */
    private readonly orderProductService: OrderProductService,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}
  public async updateProduct(
    getProductParamsDto: GetProductParamsDto,
    updateProductDto: PatchProductDto,
    userId: number,
  ) {
    let product = undefined;
    let user = undefined;
    let totalOrderedQuantity = undefined;
    try {
      user = await this.usersService.findUserById(userId);
    } catch (error) {
      this.logger.error(
        'Failed to fetch user: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }
    // 1. Find the product with its orders

    try {
      product = await this.productsRepository.findOne({
        where: { id: getProductParamsDto.id, user: { id: user.id } },
        relations: { orderProducts: true },
      });
    } catch (error) {
      this.logger.error(
        'Failed to fetch product: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    if (!product) {
      this.logger.warn(`Product not found for ID ${getProductParamsDto.id}`);
      throw new NotFoundException('Product not found');
    }

    // 2. Validate input fields
    if (
      updateProductDto.quantity !== undefined &&
      updateProductDto.quantity <= 0
    ) {
      this.logger.warn('Quantity must be greater than 0');
      throw new BadRequestException('Quantity must be greater than 0');
    }
    if (updateProductDto.price !== undefined && updateProductDto.price <= 0) {
      this.logger.warn('Price must be greater than 0');
      throw new BadRequestException('Price must be greater than 0');
    }
    if (
      updateProductDto.discount !== undefined &&
      (updateProductDto.discount < 0 || updateProductDto.discount > 1)
    ) {
      this.logger.warn('Discount must be between 0 and 1');
      throw new BadRequestException('Discount must be between 0 and 1');
    }

    // 3. Get total quantity of this product in active orders
    try {
      totalOrderedQuantity =
        await this.orderProductService.getTotalOrderedQuantity(product.id);
    } catch (error) {
      this.logger.error(
        'Failed to fetch total ordered quantity: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    // 4. If updating quantity, ensure it’s not less than the total ordered quantity
    if (
      updateProductDto.quantity !== undefined &&
      updateProductDto.quantity < totalOrderedQuantity
    ) {
      this.logger.warn(
        `Cannot decrease quantity below ${totalOrderedQuantity}`,
      );
      throw new BadRequestException(
        `Cannot decrease quantity below ${totalOrderedQuantity} because this amount is currently ordered`,
      );
    }

    // 5. Define allowed fields (quantity is always allowed now, with the above restriction)
    const allowedFields = [
      'productName',
      'quantity',
      'discount',
      'price',
      'image',
      'heavyWeight',
      'size',
      'color',
      'totalProductsSold',
    ];

    // 6. Ensure only allowed fields are updated
    for (const key of Object.keys(updateProductDto)) {
      if (!allowedFields.includes(key)) {
        this.logger.warn(`Cannot update field: ${key}`);
        throw new BadRequestException(`Cannot update field: ${key}`);
      }
    }

    // 7. Update and save product
    Object.assign(product, updateProductDto);
    try {
      product = await this.productsRepository.save(product);
      this.logger.log('Product updated successfully');
      return product;
    } catch (error) {
      this.logger.error(
        'Failed to update product: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
  }

  public async updateProductFromOrder(
    product: Product,
    userId: number,
    manager?: EntityManager,
  ): Promise<Product> {
    // Use the provided manager if available, otherwise use the repository
    const repository = manager
      ? manager.getRepository(Product)
      : this.productsRepository;

    // Find the existing product using the repository
    const existingProduct = await repository.findOne({
      where: { id: product.id, user: { id: userId } },
    });
    if (!existingProduct) {
      this.logger.warn(`Product with ID ${product.id} not found`);
      throw new NotFoundException(`Product with ID ${product.id} not found`);
    }

    // Validate quantity
    if (product.quantity < 0) {
      this.logger.warn(`Product ${product.id} quantity cannot be negative`);
      throw new BadRequestException(
        `Product ${product.id} quantity cannot be negative`,
      );
    }

    // Save the updated product using the repository
    return repository.save(product);
  }
}
