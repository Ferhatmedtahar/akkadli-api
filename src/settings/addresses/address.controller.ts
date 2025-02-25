import { Body, Controller, Get, Patch } from '@nestjs/common';
import { PatchAddressDto } from './dtos/patchAddress.dto';
import { AddressService } from './providers/address.service';

@Controller('settings/address')
export class AddressController {
  constructor(
    /**inject address service */
    private readonly addressService: AddressService,
  ) {}

  @Get()
  public async getAddressByUserId() {
    return this.addressService.getAddressByUserId();
  }
  @Patch()
  public async updateAddress(@Body() patchAddressDto: PatchAddressDto) {
    return this.addressService.updateAddress(patchAddressDto);
  }
  // public async getAddressById(@Param() getAddressParamDto: GetAddressParamDto) {
  //   return this.addressService.getAddressById(getAddressParamDto);
  // }
}
