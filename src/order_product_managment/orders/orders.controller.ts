import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { OrdersService } from './providers/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    /**inject order service */
    private readonly orderService: OrdersService,
  ) {}
  @Post()
  public createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }
}
