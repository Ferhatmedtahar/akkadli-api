import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GetOrderParamsDto } from '../dtos/getOrderParams.dto';
import { OrderStatus } from '../enums/orderStatus.enum';
import { Order } from '../order.entity';

@Injectable()
export class DeleteOrderProvider {
  constructor(
    /**inject order repository */
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}

  public async deleteOrder(
    getOrderParamsDto: GetOrderParamsDto,
    userId: number,
  ) {
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
      throw new NotFoundException('User not found.');
    }

    try {
      order = await this.orderRepository.findOne({
        where: { id: getOrderParamsDto.id, user: { id: user.id } },
      });
    } catch (error) {
      this.logger.error(
        'Failed to fetch order: Database connection error',
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

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${getOrderParamsDto.id} not found.`,
        { description: 'error finding the order.' },
      );
    }

    if (order.status !== OrderStatus.PENDING) {
      this.logger.warn('Only pending orders can be deleted.');
      throw new BadRequestException('Only pending orders can be deleted.');
    }

    try {
      await this.orderRepository.delete(order.id);
    } catch (error) {
      this.logger.error(
        'Failed to delete order: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new BadRequestException('error deleting the order.', {
        description: 'order could not be deleted.',
        cause: error,
      });
    }

    return {
      message: 'order deleted',
      id: getOrderParamsDto.id,
    };
  }

  public async softDeleteOrder(
    getOrderParamsDto: GetOrderParamsDto,
    userId: number,
  ) {
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
      throw new NotFoundException('User not found.');
    }

    try {
      order = await this.orderRepository.findOne({
        where: { id: getOrderParamsDto.id, user: { id: user.id } },
      });
    } catch (error) {
      this.logger.error(
        'Failed to fetch order: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${getOrderParamsDto.id} not found.`,
        { description: 'error finding the order.' },
      );
    }

    if (order.status !== OrderStatus.PENDING) {
      this.logger.warn('Only pending orders can be deleted.');
      throw new BadRequestException('Only pending orders can be deleted.');
    }

    try {
      await this.orderRepository.softDelete(order.id);
    } catch (error) {
      this.logger.error(
        'Failed to soft delete order: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new BadRequestException('error deleting the order.', {
        description: 'order could not be deleted.',
        cause: error,
      });
    }

    return {
      message: 'order soft deleted',
      id: getOrderParamsDto.id,
    };
  }
}
