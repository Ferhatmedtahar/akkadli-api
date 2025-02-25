import { Injectable } from '@nestjs/common';
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
    //TODO replace the static user id with the id from the request after authentication
    const user = await this.usersService.findUserById(12);
    return await this.addressRepository.findOneBy({ id: user.address.id });
  }
}
