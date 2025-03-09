import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Address } from '../address.entity';
import { ILogger } from 'src/logger/interfaces/logger.interface';

@Injectable()
export class GetAddressProvider {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject address repository */
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}
  public async getAddressByUserId(userId: number) {
    let user = undefined;
    let address = undefined;
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
      this.logger.warn(`User not found for ID ${userId} `);
      throw new UnauthorizedException('user not found', {
        description: 'error finding the user',
      });
    }
    try {
      address = await this.addressRepository.findOneBy({ id: user.address.id });
    } catch (error) {
      this.logger.error(
        'Failed to find address: Database error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }
    if (!address) {
      this.logger.warn(`Address not found for ID ${userId} `);
      throw new BadRequestException('address not found', {
        description: 'error finding the user',
      });
    }
    this.logger.log(`Address found for ID ${userId} `);
    return address;
  }
}
