import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Address } from '../address.entity';
import { CreateAddressDto } from '../dtos/createAddress.dto';
import { GetAddressParamDto } from '../dtos/getAddressParam.dto';
import { PatchAddressDto } from '../dtos/patchAddress.dto';

import { GetAddressProvider } from './get-address.provider';
import { PatchAddressProvider } from './patch-address.provider';

@Injectable()
export class AddressService {
  constructor(
    /**inject patch address Provider*/
    private readonly patchAddressProvider: PatchAddressProvider,
    /**inject get address Provider by user id  */
    private readonly getAddressProvider: GetAddressProvider,
  ) {}

  public async getAddressByUserId() {
    return this.getAddressProvider.getAddressByUserId();
  }

  public async updateAddress(@Body() patchAddressDto: PatchAddressDto) {
    return this.patchAddressProvider.updateAddress(patchAddressDto);
  }
}
