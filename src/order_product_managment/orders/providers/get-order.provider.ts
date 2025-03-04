import {
  BadRequestException,
  Injectable,
  Param,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { ProductsService } from 'src/order_product_managment/products/providers/products.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GetOrderParamsDto } from '../dtos/getOrderParams.dto';
import { Order } from '../order.entity';

@Injectable()
export class GetOrderProvider {
  constructor(
    /**inject order repository */
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    /**inject product service */
    private readonly productService: ProductsService,
    /**inject order product service */
    private readonly orderProductService: OrderProductService,

    /**inject user service */
    private readonly usersService: UsersService,
  ) {}

  public async getOrder(@Param() getOrderParamsDto: GetOrderParamsDto) {
    let user = undefined;
    let order = undefined;
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
    if (!user) {
      throw new BadRequestException('user not found.', {
        description: 'user could not be found using the provided id',
      });
    }

    try {
      order = await this.orderRepository.findOne({
        where: { id: getOrderParamsDto.id, user: { id: user.id } },
        relations: { orderProducts: { product: true } },
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

    if (!order) {
      throw new BadRequestException('order not found', {
        description: 'order could not be found using the provided id',
      });
    }
  }

  public async getAllOrders() {
    let orders = undefined;
    let user = undefined;
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
    if (!user) {
      throw new BadRequestException('user not found.', {
        description: 'user could not be found using the provided id',
      });
    }

    try {
      orders = await this.orderRepository.find({
        where: { user: { id: user.id } },
        relations: {
          orderProducts: { product: true },
        },
      });
      return orders;
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
