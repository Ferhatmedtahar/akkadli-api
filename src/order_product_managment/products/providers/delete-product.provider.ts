import {
  BadRequestException,
  Injectable,
  Param,
  RequestTimeoutException,
} from '@nestjs/common';
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
    getProductParamsDto: GetProductParamsDto,
    userId: number,
  ) {
    let user = undefined;
    let product = undefined;

    try {
      user = await this.usersService.findUserById(userId);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    //1 find the product from database based on the product id
    try {
      product = await this.productsRepository.findOne({
        where: { id: getProductParamsDto.id, user: { id: user.id } },
        relations: {
          orderProducts: true,
        },
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
      throw new BadRequestException('Product not found');
    }

    if (product.orderProducts.length > 0) {
      throw new BadRequestException(
        'Cannot delete this product because it has associated orders.',
      );
    }
    //2 delete the product
    try {
      await this.productsRepository.delete(product.id);
      return { message: 'product deleted', deleted: true, id: product.id };
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
