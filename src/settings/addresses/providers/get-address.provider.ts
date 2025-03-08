import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Address } from '../address.entity';

@Injectable()
export class GetAddressProvider {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject address repository */
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  public async getAddressByUserId(userId: number) {
    let user = undefined;
    let address = undefined;
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
      throw new UnauthorizedException('user not found', {
        description: 'error finding the user',
      });
    }
    try {
      address = await this.addressRepository.findOneBy({ id: user.address.id });
    } catch {
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }
    if (!address) {
      throw new BadRequestException('address not found', {
        description: 'error finding the user',
      });
    }

    return address;
  }
}
