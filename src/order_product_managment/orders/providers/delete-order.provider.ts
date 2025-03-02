import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { ProductsService } from 'src/order_product_managment/products/providers/products.service';
import { Repository } from 'typeorm';
import { GetOrderParamsDto } from '../dtos/getOrderParams.dto';
import { Order } from '../order.entity';

@Injectable()
export class DeleteOrderProvider {
  constructor(
    /**inject order repository */
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    /**inject product service */
    private readonly productService: ProductsService,
    /**inject order product service */
    private readonly orderProductService: OrderProductService,
  ) {}

  public async deleteOrder(@Param() getOrderParamsDto: GetOrderParamsDto) {
    const order = await this.orderRepository.findOne({
      where: { id: getOrderParamsDto.id },
    });

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${getOrderParamsDto.id} not found.`,
      );
    }

    if (order.status !== 'pending') {
      throw new BadRequestException('Only pending orders can be deleted.');
    }

    await this.orderRepository.delete(order);

    return {
      message: 'order soft deleted',
      id: getOrderParamsDto.id,
    };
  }

  public async softDeleteOrder(@Param() getOrderParamsDto: GetOrderParamsDto) {
    const order = await this.orderRepository.findOne({
      where: { id: getOrderParamsDto.id },
    });

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${getOrderParamsDto.id} not found.`,
      );
    }

    if (order.status !== 'pending') {
      throw new BadRequestException('Only pending orders can be deleted.');
    }

    await this.orderRepository.softDelete(order);

    return {
      message: 'order soft deleted',
      id: getOrderParamsDto.id,
    };
  }
}
