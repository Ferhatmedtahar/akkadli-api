import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GetProductParamsDto } from '../dtos/getProductParams.dto';
import { Product } from '../product.entity';
import { UpdateProductProvider } from './update-product.provider';

@Injectable()
export class GetProductProvider {
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

  public async getProductById(getProductParamsDto: GetProductParamsDto) {
    // get the user id from the request and Find the user
    const userId = 19;
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Find the product and ensure it belongs to the user
    const product = await this.productsRepository.findOne({
      where: { id: getProductParamsDto.id, user: { id: userId } },
    });

    if (!product) {
      throw new ForbiddenException('You do not have access to this product');
    }

    return product;
  }
  public async findAll() {
    //find a user and check if it exist in db
    //TODO later change the user to the current user on the requuest
    const user = await this.usersService.findUserById(19);

    if (!user) {
      return {
        message: 'user not found',
        error: true,
      };
    }
    // return the products of that user
    return user.products;
  }
}
