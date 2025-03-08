import {
  BadRequestException,
  Body,
  Injectable,
  InternalServerErrorException,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Delivery } from '../delivery.entity';
import { CreateDeliveryDto } from '../dtos/createDeliveries.dto';

@Injectable()
export class CreateDeliveryProvider {
  private readonly logger = new Logger(CreateDeliveryProvider.name);
  constructor(
    /**inject delivery repository */
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    /**inject user service */
    private readonly usersService: UsersService,
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
    } catch {
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }

    if (existingDelivery) {
      throw new BadRequestException('delivery already exists', {
        description: 'delivery already exists in database',
      });
    }
    try {
      user = await this.usersService.findUserById(userId);
    } catch {
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }
    if (!user) {
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
    } catch {
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }
    if (!newDelivery) {
      throw new BadRequestException('delivery not created', {
        description: 'error creating delivery',
      });
    }
    return newDelivery;
  }
}
