import { Body, Injectable } from '@nestjs/common';
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

  public async getAddressByUserId(userId: number) {
    return this.getAddressProvider.getAddressByUserId(userId);
  }

  public async updateAddress(
    @Body() patchAddressDto: PatchAddressDto,
    userId: number,
  ) {
    return this.patchAddressProvider.updateAddress(patchAddressDto, userId);
  }
}
