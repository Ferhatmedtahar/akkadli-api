import { BadRequestException, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GetProductParamsDto } from '../dtos/getProductParams.dto';
import { Product } from '../product.entity';
import { UpdateProductProvider } from './update-product.provider';

@Injectable()
export class DeleteProductProvider {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject products repository */
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    /**inject order product service */
    private readonly orderProductService: OrderProductService,
    /**inject update product provider */
    private readonly updateProductProvider: UpdateProductProvider,
  ) {}

  public async deleteProduct(
    @Param() getProductParamsDto: GetProductParamsDto,
  ) {
    //1 find the product from database based on the product id
    const product = await this.productsRepository.findOne({
      where: { id: getProductParamsDto.id },
      relations: {
        orderProducts: true,
      },
    });

    if (product.orderProducts.length > 0) {
      throw new BadRequestException(
        'Cannot delete this product because it has associated orders.',
      );
    }
    //2 delete the product
    return await this.productsRepository.delete(product.id);
  }
}
