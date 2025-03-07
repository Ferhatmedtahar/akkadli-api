import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { GetOrderParamsDto } from './dtos/getOrderParams.dto';
import { GetOrdersDto } from './dtos/getOrders.dto';
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
  public createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.orderService.createOrder(createOrderDto, user.sub);
  }

  @Get('/:id')
  public getOrderbyId(
    @Param() getOrderParamsDto: GetOrderParamsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.orderService.getOrderbyId(getOrderParamsDto, user.sub);
  }

  @Get()
  public getAllOrders(
    @Query() ordersQuery: GetOrdersDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.orderService.getAllOrders(ordersQuery, user.sub);
  }

  @Patch('/:id')
  public updateOrder(
    @Param() getOrderParamsDto: GetOrderParamsDto,
    @Body() updateOrderDto: PatchOrderDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.orderService.updateOrder(
      getOrderParamsDto,
      updateOrderDto,
      user.sub,
    );
  }

  @Delete('/:id')
  public deleteOrder(
    @Param() getOrderParamsDto: GetOrderParamsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.orderService.deleteOrder(getOrderParamsDto, user.sub);
  }
  @Delete('soft-delete/:id')
  public softDeleteOrder(
    @Param() getOrderParamsDto: GetOrderParamsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.orderService.softDeleteOrder(getOrderParamsDto, user.sub);
  }
}
