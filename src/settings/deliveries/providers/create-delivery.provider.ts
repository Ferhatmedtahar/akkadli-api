import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Delivery } from '../delivery.entity';
import { CreateDeliveryDto } from '../dtos/createDeliveries.dto';

@Injectable()
export class CreateDeliveryProvider {
  constructor(
    /**inject delivery repository */
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}
  public async createDelivery(
    createDeliveryDto: CreateDeliveryDto,
    userId: number,
  ) {
    //get user  based on user id from body , later will change to getit from auth
    let user = undefined;
    let existingDelivery = undefined;
    let newDelivery = undefined;

    try {
      existingDelivery = await this.deliveryRepository.findOneBy({
        apiId: createDeliveryDto.apiId,
      });
    } catch (error) {
      this.logger.error(
        'Failed to find delivery: Database error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }

    if (existingDelivery) {
      this.logger.warn('Delivery already exists');
      throw new BadRequestException('delivery already exists', {
        description: 'delivery already exists in database',
      });
    }
    try {
      user = await this.usersService.findUserById(userId);
    } catch (error) {
      this.logger.error(
        'Failed to find user: Database error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }
    if (!user) {
      this.logger.warn(`User not found for ID ${userId}`);
      throw new BadRequestException('user not found', {
        description: 'user does not exist in database',
      });
    }

    //create delivery
    newDelivery = this.deliveryRepository.create({
      ...createDeliveryDto,
      user: user,
    });
    //save and return the delivery
    try {
      newDelivery = await this.deliveryRepository.save(newDelivery);
    } catch (error) {
      this.logger.error(
        'Failed to create delivery: Database error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }
    if (!newDelivery) {
      this.logger.warn('Delivery not created');
      throw new BadRequestException('delivery not created', {
        description: 'error creating delivery',
      });
    }
    this.logger.log('Delivery created successfully');
    return newDelivery;
  }
}
