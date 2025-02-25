import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Address } from '../address.entity';
import { PatchAddressDto } from '../dtos/patchAddress.dto';

@Injectable()
export class PatchAddressProvider {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject address repository */
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  public async updateAddress(@Body() patchAddressDto: PatchAddressDto) {
    //find the user using the user service and id from the auth token
    const user = await this.usersService.findUserById(13);
    console.log(user);
    //find the address using the user
    const address = await this.addressRepository.findOneById(user.address.id);
    address.wilaya = patchAddressDto.wilaya || address.wilaya;
    address.municipality = patchAddressDto.municipality || address.municipality;
    address.postalCode = patchAddressDto.postalCode || address.postalCode;

    return await this.addressRepository.save(address);
  }
}
