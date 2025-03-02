import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  Param,
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
    // 1. Find the product with its orders
    const product = await this.productsRepository.findOne({
      where: { id: getProductParamsDto.id },
      relations: { orderProducts: true },
    });
    console.log(product);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (updateProductDto.quantity <= 0) {
      throw new BadRequestException('quantity must be greater than 0');
    }
    if (updateProductDto.price <= 0) {
      throw new BadRequestException('price must be greater than 0');
    }
    if (updateProductDto.discount < 0 || updateProductDto.discount > 1) {
      throw new BadRequestException('discount must be between 0 and 1');
    }
    // 2. Check if the product has existing orders
    const hasOrders = product.orderProducts.length > 0;

    // 3. Validate fields before updating
    const allowedFields = [
      'discount',
      'price',
      'image',
      'heavyWeight',
      'size',
      'color',
    ];

    if (!hasOrders) {
      // If no orders exist, allow updating quantity
      allowedFields.push('quantity');
    } else {
      // If orders exist, prevent decreasing quantity
      if ('quantity' in updateProductDto) {
        throw new BadRequestException(
          'Cannot update quantity because this product has existing orders.',
        );
      }
    }

    // 4. Ensure only allowed fields are updated
    for (const key of Object.keys(updateProductDto)) {
      if (!allowedFields.includes(key)) {
        throw new BadRequestException(`Cannot update field: ${key}`);
      }
    }

    // 5. Update and save product
    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }
}
