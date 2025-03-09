import {
  BadRequestException,
  Inject,
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
import { ILogger } from 'src/logger/interfaces/logger.interface';

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
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
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
    } catch (error) {
      this.logger.error(
        'Failed to fetch user: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    if (!user) {
      this.logger.warn(`User not found for ID ${userId}`);
      throw new BadRequestException('user not found', {
        description: 'user not found in the database',
      });
    }
    //get delivery  by id
    try {
      delivery = await this.deliveryRepository.findOne({
        where: { id: getDeliveryParamsDto.id, user: { id: user.id } },
      });
    } catch (error) {
      this.logger.error(
        'Failed to fetch delivery: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!delivery) {
      this.logger.warn(`Delivery not found for ID ${getDeliveryParamsDto.id}`);
      throw new BadRequestException('Delivery not found', {
        description: 'Delivery does not exist in the database',
      });
    }
    this.logger.log(`Delivery fetched successfully for user ID ${userId}`);
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
    } catch (error) {
      this.logger.error(
        'Failed to fetch user: Database connection error',
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
      this.logger.log(`Deliveries fetched successfully for user ID ${userId}`);
    } catch (error) {
      this.logger.error(
        'Failed to fetch deliveries: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }

    return deliveries;
  }
}
