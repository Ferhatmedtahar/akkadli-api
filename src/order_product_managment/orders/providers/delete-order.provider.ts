import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { ProductsService } from 'src/order_product_managment/products/providers/products.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GetOrderParamsDto } from '../dtos/getOrderParams.dto';
import { OrderStatus } from '../enums/orderStatus.enum';
import { Order } from '../order.entity';

@Injectable()
export class DeleteOrderProvider {
  constructor(
    /**inject order repository */
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject product service */
    private readonly productService: ProductsService,
    /**inject order product service */
    private readonly orderProductService: OrderProductService,
  ) {}

  public async deleteOrder(@Param() getOrderParamsDto: GetOrderParamsDto) {
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
      throw new NotFoundException('User not found.');
    }

    try {
      order = await this.orderRepository.findOne({
        where: { id: getOrderParamsDto.id },
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
      throw new NotFoundException(
        `Order with ID ${getOrderParamsDto.id} not found.`,
        { description: 'error finding the order.' },
      );
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Only pending orders can be deleted.');
    }

    try {
      await this.orderRepository.delete(order.id);
    } catch (error) {
      throw new BadRequestException('error deleting the order.', {
        description: 'order could not be deleted.',
        cause: error,
      });
    }

    return {
      message: 'order deleted',
      id: getOrderParamsDto.id,
    };
  }

  public async softDeleteOrder(@Param() getOrderParamsDto: GetOrderParamsDto) {
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
      throw new NotFoundException('User not found.');
    }

    try {
      order = await this.orderRepository.findOne({
        where: { id: getOrderParamsDto.id },
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
      throw new NotFoundException(
        `Order with ID ${getOrderParamsDto.id} not found.`,
        { description: 'error finding the order.' },
      );
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Only pending orders can be deleted.');
    }

    try {
      await this.orderRepository.softDelete(order.id);
    } catch (error) {
      throw new BadRequestException('error deleting the order.', {
        description: 'order could not be deleted.',
        cause: error,
      });
    }

    return {
      message: 'order soft deleted',
      id: getOrderParamsDto.id,
    };
  }
}
