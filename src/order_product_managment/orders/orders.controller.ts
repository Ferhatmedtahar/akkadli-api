import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { GetOrderParamsDto } from './dtos/getOrderParams.dto';
import { PatchOrderDto } from './dtos/patchOrder.dto';
import { OrdersService } from './providers/orders.service';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(
    /**inject order service */
    private readonly orderService: OrdersService,
  ) {}
  @Post()
  public createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get('/:id')
  public getOrderbyId(@Param() getOrderParamsDto: GetOrderParamsDto) {
    return this.orderService.getOrderbyId(getOrderParamsDto);
  }

  @Get()
  public getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Patch('/:id')
  public updateOrder(
    @Param() getOrderParamsDto: GetOrderParamsDto,
    @Body() updateOrderDto: PatchOrderDto,
  ) {
    return this.orderService.updateOrder(getOrderParamsDto, updateOrderDto);
  }

  @Delete('/:id')
  public deleteOrder(@Param() getOrderParamsDto: GetOrderParamsDto) {
    return this.orderService.deleteOrder(getOrderParamsDto);
  }
  @Delete('/soft-delete/:id')
  public softDeleteOrder(@Param() getOrderParamsDto: GetOrderParamsDto) {
    return this.orderService.softDeleteOrder(getOrderParamsDto);
  }
}
