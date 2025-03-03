import {
  BadRequestException,
  Injectable,
  Param,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Delivery } from '../delivery.entity';
import { GetDeliveryParamsDto } from '../dtos/getDeliveryParams.dto';

@Injectable()
export class DeleteDeliveryProvider {
  constructor(
    /**inject delivery repository */
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    /**inject user service */
    private readonly usersService: UsersService,
  ) {}
  public async deleteDelivery(
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
  ) {
    //get user id from request
    let user = undefined;
    let deletedDelivery = undefined;
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
      throw new UnauthorizedException('user not found', {
        description: 'error finding the user',
      });
    }

    try {
      deletedDelivery = await this.deliveryRepository.findOneBy({
        id: getDeliveryParamsDto.id,
        user: { id: user.id },
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

    if (!deletedDelivery) {
      throw new BadRequestException('delivery not found', {
        description: 'delivery not found in database',
      });
    }
    try {
      await this.deliveryRepository.remove(deletedDelivery);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    return {
      message: 'delivery deleted',
      deleted: true,
      id: deletedDelivery.id,
    };
  }
}

// import {
//   Injectable,
//   InternalServerErrorException,
//   Logger,
//   NotFoundException,
//   Param,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UsersService } from 'src/users/providers/users.service';
// import { Repository } from 'typeorm';
// import { Delivery } from '../delivery.entity';
// import { GetDeliveryParamsDto } from '../dtos/getDeliveryParams.dto';

// @Injectable()
// export class DeleteDeliveryProvider {
//   private readonly logger = new Logger(DeleteDeliveryProvider.name);

//   constructor(
//     @InjectRepository(Delivery)
//     private readonly deliveryRepository: Repository<Delivery>,
//     private readonly usersService: UsersService,
//   ) {}

//   public async deleteDelivery(
//     @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
//   ) {
//     let user = undefined;
//     try {
//       user = await this.usersService.findUserById(19); // Replace with auth later
//       this.logger.log('User fetched successfully for deletion:', {
//         userId: 19,
//       });
//     } catch (error) {
//       this.logger.error(
//         'Failed to fetch user: Database connection error',
//         error.stack || error.message || 'No stack trace available',
//       );
//       throw new InternalServerErrorException(
//         'Database connection failed, please try again later',
//         { description: 'Error connecting to the database' },
//       );
//     }

//     if (!user) {
//       this.logger.warn('User not found for ID 19');
//       throw new NotFoundException('User not found', {
//         description: 'User does not exist in the database',
//       });
//     }

//     let delivery = undefined;
//     try {
//       delivery = await this.deliveryRepository.findOne({
//         where: { id: getDeliveryParamsDto.id, user: { id: user.id } },
//       });
//       this.logger.log('Delivery found for deletion:', {
//         deliveryId: getDeliveryParamsDto.id,
//       });
//     } catch (error) {
//       this.logger.error(
//         'Failed to find delivery: Database error',
//         error.stack || error.message || 'No stack trace available',
//       );
//       throw new InternalServerErrorException(
//         'Failed to retrieve delivery, please try again later',
//         { description: 'Error querying the database' },
//       );
//     }

//     if (!delivery) {
//       this.logger.warn('Delivery not found or not owned by user:', {
//         deliveryId: getDeliveryParamsDto.id,
//         userId: user.id,
//       });
//       throw new NotFoundException('Delivery not found', {
//         description: 'Delivery does not exist or does not belong to the user',
//       });
//     }

//     try {
//       await this.deliveryRepository.remove(delivery);
//       this.logger.log('Delivery deleted successfully:', {
//         deliveryId: delivery.id,
//       });
//     } catch (error) {
//       this.logger.error(
//         'Failed to delete delivery: Database error',
//         error.stack || error.message || 'No stack trace available',
//       );
//       throw new InternalServerErrorException(
//         'Failed to delete delivery, please try again later',
//         { description: 'Error removing delivery from the database' },
//       );
//     }

//     return {
//       message: 'Delivery deleted successfully',
//       deleted: true,
//       id: delivery.id,
//     };
//   }
// }
