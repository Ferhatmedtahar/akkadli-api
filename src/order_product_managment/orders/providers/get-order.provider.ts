import { Injectable, Param } from '@nestjs/common';
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
    const user = await this.usersService.findUserById(19);
    return await this.orderRepository.findOne({
      where: { id: getOrderParamsDto.id, user: { id: user.id } },
      relations: { orderProducts: { product: true } },
    });
  }

  public async getAllOrders() {
    const user = await this.usersService.findUserById(19);
    console.log(user);
    const order = await this.orderRepository.find({
      where: { user: { id: user.id } },
      relations: {
        orderProducts: { product: true },
      },
    });

    return order;
  }
}
