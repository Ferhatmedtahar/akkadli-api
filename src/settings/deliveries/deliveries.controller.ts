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
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
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
  public createDelivery(
    @Body() createDeliveryDto: CreateDeliveryDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.deliveriesService.createDelivery(createDeliveryDto, user.sub);
  }

  @Get()
  public findAllByUserId(
    @Query() deliveriesQuery: GetDeliveriesDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.deliveriesService.findAllByUserId(deliveriesQuery, user.sub);
  }

  @Get('/:id')
  public findOneById(
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.deliveriesService.findOneById(getDeliveryParamsDto, user.sub);
  }

  @Patch('/:id')
  public updateDelivery(
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
    @Body() patchDeliveryDto: PatchDeliveryDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.deliveriesService.updateDelivery(
      getDeliveryParamsDto,
      patchDeliveryDto,
      user.sub,
    );
  }
  @Delete('/:id')
  public deleteDelivery(
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.deliveriesService.deleteDelivery(
      getDeliveryParamsDto,
      user.sub,
    );
  }
}
