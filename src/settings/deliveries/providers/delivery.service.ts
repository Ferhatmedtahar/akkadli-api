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
  public async createDelivery(
    createDeliveryDto: CreateDeliveryDto,
    userId: number,
  ) {
    return this.createDeliveryProvider.createDelivery(
      createDeliveryDto,
      userId,
    );
  }

  public async findOneById(
    getDeliveryParamsDto: GetDeliveryParamsDto,
    userId: number,
  ) {
    return this.getDeliveryProvider.findOneById(getDeliveryParamsDto, userId);
  }
  public async findAllByUserId(
    deliveriesQuery: GetDeliveriesDto,
    userId: number,
  ) {
    return this.getDeliveryProvider.findAllByUserId(deliveriesQuery, userId);
  }
  public async updateDelivery(
    getDeliveryParamsDto: GetDeliveryParamsDto,
    patchDeliveryDto: PatchDeliveryDto,
    userId: number,
  ) {
    return this.updateDeliveryProvider.updateDelivery(
      patchDeliveryDto,
      getDeliveryParamsDto,
      userId,
    );
  }
  public async deleteDelivery(
    getDeliveryParamsDto: GetDeliveryParamsDto,
    userId: number,
  ) {
    return this.deleteDeliveryProvider.deleteDelivery(
      getDeliveryParamsDto,
      userId,
    );
  }
}
