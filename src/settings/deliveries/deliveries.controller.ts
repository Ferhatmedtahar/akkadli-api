import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dtos/createDeliveries.dto';
import { DeliveryService } from './providers/delivery.service';
import { GetDeliveryParamsDto } from './dtos/getDeliveryParams.dto';
import { PatchDeliveryDto } from './dtos/patchDeliveries.dto';

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
  public findAllByUserId() {
    return this.deliveriesService.findAllByUserId();
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
