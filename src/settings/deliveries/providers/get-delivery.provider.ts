import {
  BadRequestException,
  Injectable,
  Param,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Delivery } from '../delivery.entity';
import { GetDeliveryParamsDto } from '../dtos/getDeliveryParams.dto';

@Injectable()
export class GetDeliveryProvider {
  constructor(
    /**inject delivery repository */
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    /**inject user service */
    private readonly usersService: UsersService,
  ) {}
  public async findOneById(
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
  ) {
    //get user id from request
    let user = undefined;
    let delivery = undefined;
    try {
      user = await this.usersService.findUserById(19);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    if (!user) {
      throw new BadRequestException('user not found', {
        description: 'user not found in the database',
      });
    }
    //get delivery  by id
    try {
      delivery = await this.deliveryRepository.findOne({
        where: { id: getDeliveryParamsDto.id, user: { id: user.id } },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!delivery) {
      throw new BadRequestException('Delivery not found', {
        description: 'Delivery does not exist in the database',
      });
    }
    return delivery;
  }

  public async findAllByUserId() {
    //get user id from request
    let user = undefined;
    let deliveries = undefined;
    try {
      user = await this.usersService.findUserById(19);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!user) {
      throw new BadRequestException('user not found', {
        description: 'user not found in the database',
      });
    }

    //get all deliveries by user id
    try {
      deliveries = await this.deliveryRepository.find({
        where: { user: { id: user.id } },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    return deliveries;
  }
}
