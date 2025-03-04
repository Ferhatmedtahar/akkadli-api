import {
  Injectable,
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
  public async getAddressByUserId() {
    let user = undefined;
    let address = undefined;
    try {
      user = await this.usersService.findUserById(19);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }

    //TODO replace the static user id with the id from the request after authentication
    try {
      address = await this.addressRepository.findOneBy({ id: user.address.id });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }
    if (!address) {
      throw new UnauthorizedException('user not found', {
        description: 'error finding the user',
      });
    }

    return address;
  }
}
