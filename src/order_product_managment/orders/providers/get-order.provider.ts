import { Injectable, Param } from '@nestjs/common';
import { GetOrderParamsDto } from '../dtos/getOrderParams.dto';

@Injectable()
export class GetOrderProvider {
  public async getOrder(@Param() getOrderParamsDto: GetOrderParamsDto) {}

  public async getAllOrders() {}
}
