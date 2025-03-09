import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GetOrderParamsDto } from '../dtos/getOrderParams.dto';
import { GetOrdersDto } from '../dtos/getOrders.dto';
import { Order } from '../order.entity';

@Injectable()
export class GetOrderProvider {
  constructor(
    /**inject order repository */
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject pagination service */
    private readonly paginationService: PaginationService,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}

  public async getOrder(getOrderParamsDto: GetOrderParamsDto, userId: number) {
    let user = undefined;
    let order = undefined;
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
      throw new BadRequestException('user not found.', {
        description: 'user could not be found using the provided id',
      });
    }

    try {
      order = await this.orderRepository.findOne({
        where: { id: getOrderParamsDto.id, user: { id: user.id } },
        relations: { orderProducts: { product: true } },
      });
      this.logger.log(`Order with id ${getOrderParamsDto.id} was found`);
    } catch (error) {
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!order) {
      throw new BadRequestException('order not found', {
        description: 'order could not be found using the provided id',
      });
    }
    return order;
  }

  public async getAllOrders(
    ordersQuery: GetOrdersDto,
    userId: number,
  ): Promise<Paginated<Order>> {
    let orders = undefined;
    let user = undefined;
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
      throw new BadRequestException('user not found.', {
        description: 'user could not be found using the provided id',
      });
    }

    try {
      const where = { user: { id: user.id } };
      const relations = {
        orderProducts: { product: true },
      };
      orders = await this.paginationService.paginateQuery(
        ordersQuery,
        this.orderRepository,
        where,
        relations,
      );
      this.logger.log(`${orders.data.length} Orders was found `);
      return orders;
    } catch {
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }
  }
}
