import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { GetIp } from 'src/auth/decorators/get-ip.decorator.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { ILogger } from 'src/logger/interfaces/logger.interface';
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
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}
  @Post()
  @ApiOperation({
    summary: 'create order',
  })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({
    status: 500,
    description: 'unable to create order',
  })
  @ApiResponse({
    status: 400,
    description: 'Order cannot be empty, or missing quantity',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  public createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @ActiveUser() user: ActiveUserData,
    @GetIp() ip: string,
  ) {
    this.logger.logRequest('create order', OrdersController.name, ip, {
      user: user.sub,
    });
    return this.orderService.createOrder(createOrderDto, user.sub);
  }

  @Get('/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'get order by id and user id ',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request and get the order, please try later',
  })
  @ApiResponse({
    status: 400,
    description: 'user or order not found',
  })
  public getOrderbyId(
    @Param() getOrderParamsDto: GetOrderParamsDto,
    @ActiveUser() user: ActiveUserData,
    @GetIp() ip: string,
  ) {
    this.logger.logRequest('get order by id ', OrdersController.name, ip, {
      user: user.sub,
    });

    return this.orderService.getOrderbyId(getOrderParamsDto, user.sub);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiResponse({
    status: 400,
    description: 'user not found',
  })
  @ApiResponse({
    status: 200,
    description: 'list of orders',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary: 'get all orders by user',
  })
  public getAllOrders(
    @Query() ordersQuery: GetOrdersDto,
    @ActiveUser() user: ActiveUserData,
    @GetIp() ip: string,
  ) {
    this.logger.logRequest('get all orders ', OrdersController.name, ip, {
      user: user.sub,
    });
    return this.orderService.getAllOrders(ordersQuery, user.sub);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'update order by id and user id ',
  })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request and update the order, please try later',
  })
  @ApiResponse({
    status: 404,
    description:
      'User or Order not found , cant update order if status is not pending',
  })
  @ApiResponse({
    status: 200,
    description: 'order updated successfully',
  })
  public updateOrder(
    @Param() getOrderParamsDto: GetOrderParamsDto,
    @Body() updateOrderDto: PatchOrderDto,
    @ActiveUser() user: ActiveUserData,
    @GetIp() ip: string,
  ) {
    this.logger.logRequest('update order by id ', OrdersController.name, ip, {
      user: user.sub,
    });
    return this.orderService.updateOrder(
      getOrderParamsDto,
      updateOrderDto,
      user.sub,
    );
  }

  @Delete('/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'delete order by id and user id ',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request and delete the order, please try later',
  })
  @ApiResponse({
    status: 404,
    description: 'User or Order not found',
  })
  @ApiResponse({
    status: 200,
    description: 'order deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'order status is not pending',
  })
  public deleteOrder(
    @Param() getOrderParamsDto: GetOrderParamsDto,
    @ActiveUser() user: ActiveUserData,
    @GetIp() ip: string,
  ) {
    this.logger.logRequest('delete order by id ', OrdersController.name, ip, {
      user: user.sub,
    });
    return this.orderService.deleteOrder(getOrderParamsDto, user.sub);
  }

  @Delete('soft-delete/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'delete order by id and user id ',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request and delete the order, please try later',
  })
  @ApiResponse({
    status: 404,
    description: 'User or Order not found',
  })
  @ApiResponse({
    status: 200,
    description: 'order deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'order status is not pending',
  })
  public softDeleteOrder(
    @Param() getOrderParamsDto: GetOrderParamsDto,
    @ActiveUser() user: ActiveUserData,
    @GetIp() ip: string,
  ) {
    this.logger.logRequest(
      'soft delete order by id ',
      OrdersController.name,
      ip,
      {
        user: user.sub,
      },
    );
    return this.orderService.softDeleteOrder(getOrderParamsDto, user.sub);
  }
}
