import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Delivery } from '../delivery.entity';
import { CreateDeliveryDto } from '../dtos/createDeliveries.dto';
import { CreateDeliveryProvider } from './create-delivery.provider';
import { DeleteDeliveryProvider } from './delete-delivery.provider';
import { GetDeliveryProvider } from './get-delivery.provider';
import { UpdateDeliveryProvider } from './update-delivery.provider';
import { GetDeliveryParamsDto } from '../dtos/getDeliveryParams.dto';
import { PatchDeliveryDto } from '../dtos/patchDeliveries.dto';
import { GetDeliveriesDto } from '../dtos/getDeliveries.dto';

@Injectable()
export class DeliveryService {
  constructor(
    /**inject create delivery provider */
    private readonly createDeliveryProvider: CreateDeliveryProvider,
    /**inject get delivery provider */
    private readonly getDeliveryProvider: GetDeliveryProvider,
    /**inject update delivery provider */
    private readonly updateDeliveryProvider: UpdateDeliveryProvider,
    /**inject delete delivery provider */
    private readonly deleteDeliveryProvider: DeleteDeliveryProvider,
  ) {}
  public async createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.createDeliveryProvider.createDelivery(createDeliveryDto);
  }

  public async findOneById(
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
  ) {
    return this.getDeliveryProvider.findOneById(getDeliveryParamsDto);
  }
  public async findAllByUserId(deliveriesQuery: GetDeliveriesDto) {
    return this.getDeliveryProvider.findAllByUserId(deliveriesQuery);
  }
  public async updateDelivery(
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
    @Body() patchDeliveryDto: PatchDeliveryDto,
  ) {
    return this.updateDeliveryProvider.updateDelivery(
      patchDeliveryDto,
      getDeliveryParamsDto,
    );
  }
  public async deleteDelivery(
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
  ) {
    return this.deleteDeliveryProvider.deleteDelivery(getDeliveryParamsDto);
  }
}
