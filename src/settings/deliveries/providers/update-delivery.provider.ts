import {
  Body,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Delivery } from '../delivery.entity';
import { GetDeliveryParamsDto } from '../dtos/getDeliveryParams.dto';
import { PatchDeliveryDto } from '../dtos/patchDeliveries.dto';

@Injectable()
export class UpdateDeliveryProvider {
  private readonly logger = new Logger(UpdateDeliveryProvider.name);

  constructor(
    /**inject delivery repository */
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    /**inject user service */
    private readonly usersService: UsersService,
  ) {}

  public async updateDelivery(
    @Body() patchDeliveryDto: PatchDeliveryDto,
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
  ) {
    // 1. Get the user (hardcoded for now, replace with auth later)
    let user = undefined;
    try {
      user = await this.usersService.findUserById(19); // Replace with auth later
      this.logger.log('User fetched successfully for delivery update:', {
        userId: 19,
      });
    } catch (error) {
      this.logger.error(
        'Failed to fetch user: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new RequestTimeoutException(
        'Database connection failed, please try again later',
        { description: 'Error connecting to the database' },
      );
    }

    if (!user) {
      this.logger.warn('User not found for ID 19');
      throw new NotFoundException('User not found', {
        description: 'User does not exist in the database',
      });
    }

    // 2. Find the delivery by ID and ensure it belongs to the user
    let delivery = undefined;
    try {
      delivery = await this.deliveryRepository.findOne({
        where: { id: getDeliveryParamsDto.id, user: { id: user.id } },
      });
      this.logger.log('Delivery found for update:', {
        deliveryId: getDeliveryParamsDto.id,
      });
    } catch (error) {
      this.logger.error(
        'Failed to find delivery: Database error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new RequestTimeoutException(
        'Failed to retrieve delivery, please try again later',
        { description: 'Error querying the database' },
      );
    }

    if (!delivery) {
      this.logger.warn('Delivery not found or not owned by user:', {
        deliveryId: getDeliveryParamsDto.id,
        userId: user.id,
      });
      throw new NotFoundException('Delivery not found', {
        description: 'Delivery does not exist or does not belong to the user',
      });
    }

    // 3. Apply changes from patchDeliveryDto
    try {
      delivery.name = patchDeliveryDto.name ?? delivery.name;
      delivery.apiId = patchDeliveryDto.apiId ?? delivery.apiId;
      delivery.apiToken = patchDeliveryDto.apiToken ?? delivery.apiToken;

      const updatedDelivery = await this.deliveryRepository.save(delivery);
      this.logger.log('Delivery updated successfully:', {
        deliveryId: updatedDelivery.id,
      });
      return updatedDelivery;
    } catch (error) {
      this.logger.error(
        'Failed to update delivery: Database error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Failed to update delivery, please try again later',
        { description: 'Error saving updated delivery to the database' },
      );
    }
  }
}
