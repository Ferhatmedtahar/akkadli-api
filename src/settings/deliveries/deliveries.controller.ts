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
import { CreateDeliveryDto } from './dtos/createDeliveries.dto';
import { GetDeliveriesDto } from './dtos/getDeliveries.dto';
import { GetDeliveryParamsDto } from './dtos/getDeliveryParams.dto';
import { PatchDeliveryDto } from './dtos/patchDeliveries.dto';
import { DeliveryService } from './providers/delivery.service';

@Controller('settings/deliveries')
export class DeliveriesController {
  constructor(
    /**inject deliveries service */
    private readonly deliveriesService: DeliveryService,
  ) {}

  @Post()
  public createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.createDelivery(createDeliveryDto);
  }

  @Get()
  public findAllByUserId(@Query() deliveriesQuery: GetDeliveriesDto) {
    return this.deliveriesService.findAllByUserId(deliveriesQuery);
  }

  @Get('/:id')
  public findOneById(@Param() getDeliveryParamsDto: GetDeliveryParamsDto) {
    return this.deliveriesService.findOneById(getDeliveryParamsDto);
  }

  @Patch('/:id')
  public updateDelivery(
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
    @Body() patchDeliveryDto: PatchDeliveryDto,
  ) {
    return this.deliveriesService.updateDelivery(
      getDeliveryParamsDto,
      patchDeliveryDto,
    );
  }
  @Delete('/:id')
  public deleteDelivery(@Param() getDeliveryParamsDto: GetDeliveryParamsDto) {
    return this.deliveriesService.deleteDelivery(getDeliveryParamsDto);
  }
}
