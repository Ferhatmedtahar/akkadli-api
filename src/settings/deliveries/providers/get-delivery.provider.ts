import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Delivery } from '../delivery.entity';
import { GetDeliveriesDto } from '../dtos/getDeliveries.dto';
import { GetDeliveryParamsDto } from '../dtos/getDeliveryParams.dto';

@Injectable()
export class GetDeliveryProvider {
  constructor(
    /**inject delivery repository */
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject pagination service */
    private readonly paginationService: PaginationService,
  ) {}
  public async findOneById(
    getDeliveryParamsDto: GetDeliveryParamsDto,
    userId: number,
  ) {
    //get user id from request
    let user = undefined;
    let delivery = undefined;
    try {
      user = await this.usersService.findUserById(userId);
    } catch {
      throw new InternalServerErrorException(
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
      throw new InternalServerErrorException(
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

  public async findAllByUserId(
    deliveriesQuery: GetDeliveriesDto,
    userId: number,
  ): Promise<Paginated<Delivery>> {
    //get user id from request
    let user = undefined;
    let deliveries = undefined;
    try {
      user = await this.usersService.findUserById(userId);
    } catch {
      throw new InternalServerErrorException(
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
      const where = { user: { id: user.id } };
      deliveries = await this.paginationService.paginateQuery(
        deliveriesQuery,
        this.deliveryRepository,
        where,
      );
      // deliveries = await this.deliveryRepository.find({
      //   where: { user: { id: user.id } },
      // });
    } catch {
      throw new InternalServerErrorException(
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
