import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { ProductsService } from 'src/order_product_managment/products/providers/products.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dtos/createOrder.dto';
import { GetOrderParamsDto } from '../dtos/getOrderParams.dto';
import { PatchOrderDto } from '../dtos/patchOrder.dto';
import { Order } from '../order.entity';
import { CreateOrderProvider } from './create-order.provider';
import { DeleteOrderProvider } from './delete-order.provider';
import { GetOrderProvider } from './get-order.provider';
import { UpdateOrderProvider } from './update-order.provider';

@Injectable()
export class OrdersService {
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
    /**inject create order provider */
    private readonly createOrderProvider: CreateOrderProvider,
    /**inject get order provider */
    private readonly getOrderProvider: GetOrderProvider,
    /**inject update order provider */
    private readonly updateOrderProvider: UpdateOrderProvider,
    /**inject delete order provider */
    private readonly deleteOrderProvider: DeleteOrderProvider,
  ) {}

  public async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.createOrderProvider.createOrder(createOrderDto);
  }

  public async getOrderbyId(@Param() getOrderParamsDto: GetOrderParamsDto) {
    return await this.getOrderProvider.getOrder(getOrderParamsDto);
  }
  public async getAllOrders() {
    return await this.getOrderProvider.getAllOrders();
  }

  public async updateOrder(
    @Param() getOrderParamsDto: GetOrderParamsDto,
    @Body() updateOrderDto: PatchOrderDto,
  ) {
    return await this.updateOrderProvider.updateOrder(
      getOrderParamsDto,
      updateOrderDto,
    );
  }

  public async deleteOrder(@Param() getOrderParamsDto: GetOrderParamsDto) {
    return this.deleteOrderProvider.deleteOrder(getOrderParamsDto);
  }

  public async softDeleteOrder(@Param() getOrderParamsDto: GetOrderParamsDto) {
    return this.deleteOrderProvider.softDeleteOrder(getOrderParamsDto);
  }
}
