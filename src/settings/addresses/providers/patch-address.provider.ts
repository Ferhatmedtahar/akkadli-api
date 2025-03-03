import { Body, Injectable, RequestTimeoutException } from '@nestjs/common';
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
    let user = undefined;
    let updatedAddress = undefined;
    //find the user using the user service and id from the auth token
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
    //find the address using the user
    try {
      updatedAddress = await this.addressRepository.findOneById(
        user.address.id,
      );
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    //update the address
    updatedAddress.wilaya = patchAddressDto.wilaya || updatedAddress.wilaya;
    updatedAddress.municipality =
      patchAddressDto.municipality || updatedAddress.municipality;
    updatedAddress.postalCode =
      patchAddressDto.postalCode || updatedAddress.postalCode;

    //save the address
    try {
      updatedAddress = await this.addressRepository.save(updatedAddress);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    return updatedAddress;
  }
}
