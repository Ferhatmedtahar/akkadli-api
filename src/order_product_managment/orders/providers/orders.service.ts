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
import { GetOrdersDto } from '../dtos/getOrders.dto';

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

  public async createOrder(createOrderDto: CreateOrderDto, userId: number) {
    return await this.createOrderProvider.createOrder(createOrderDto, userId);
  }

  public async getOrderbyId(
    getOrderParamsDto: GetOrderParamsDto,
    userId: number,
  ) {
    return await this.getOrderProvider.getOrder(getOrderParamsDto, userId);
  }
  public async getAllOrders(ordersQuery: GetOrdersDto, userId: number) {
    return await this.getOrderProvider.getAllOrders(ordersQuery, userId);
  }

  public async updateOrder(
    getOrderParamsDto: GetOrderParamsDto,
    updateOrderDto: PatchOrderDto,
    userId: number,
  ) {
    return await this.updateOrderProvider.updateOrder(
      getOrderParamsDto,
      updateOrderDto,
      userId,
    );
  }

  public async deleteOrder(
    getOrderParamsDto: GetOrderParamsDto,
    userId: number,
  ) {
    return this.deleteOrderProvider.deleteOrder(getOrderParamsDto, userId);
  }

  public async softDeleteOrder(
    getOrderParamsDto: GetOrderParamsDto,
    userId: number,
  ) {
    return this.deleteOrderProvider.softDeleteOrder(getOrderParamsDto, userId);
  }
}
