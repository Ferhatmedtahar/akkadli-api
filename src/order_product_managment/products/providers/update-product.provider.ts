import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  Param,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
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
  ) {}
  public async updateProduct(
    @Param() getProductParamsDto: GetProductParamsDto,
    @Body() updateProductDto: PatchProductDto,
  ) {
    let product = undefined;
    let user = undefined;
    let totalOrderedQuantity = undefined;
    try {
      user = await this.usersService.findUserById(19);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    // 1. Find the product with its orders

    try {
      product = await this.productsRepository.findOne({
        where: { id: getProductParamsDto.id, user: { id: user.id } },
        relations: { orderProducts: true },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // 2. Validate input fields
    if (
      updateProductDto.quantity !== undefined &&
      updateProductDto.quantity <= 0
    ) {
      throw new BadRequestException('Quantity must be greater than 0');
    }
    if (updateProductDto.price !== undefined && updateProductDto.price <= 0) {
      throw new BadRequestException('Price must be greater than 0');
    }
    if (
      updateProductDto.discount !== undefined &&
      (updateProductDto.discount < 0 || updateProductDto.discount > 1)
    ) {
      throw new BadRequestException('Discount must be between 0 and 1');
    }

    // 3. Get total quantity of this product in active orders
    try {
      totalOrderedQuantity =
        await this.orderProductService.getTotalOrderedQuantity(product.id);
    } catch {
      throw new RequestTimeoutException(
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
        throw new BadRequestException(`Cannot update field: ${key}`);
      }
    }

    // 7. Update and save product
    Object.assign(product, updateProductDto);
    try {
      product = await this.productsRepository.save(product);
      return product;
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
  }
}
