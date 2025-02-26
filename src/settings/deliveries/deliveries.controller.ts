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
  public findOneById(@Param('id') id: number) {
    return this.deliveriesService.findOneById(id);
  }

  @Patch('/:id')
  public updateDelivery(@Param('id') id: number) {
    return this.deliveriesService.updateDelivery(id);
  }
  @Delete('/:id')
  public deleteDelivery(@Param('id') id: number) {
    return this.deliveriesService.deleteDelivery(id);
  }
}
