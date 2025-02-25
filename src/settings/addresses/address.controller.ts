import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { GetAddressParamDto } from './dtos/getAddressParam.dto';
import { PatchAddressDto } from './dtos/patchAddress.dto';
import { AddressService } from './providers/address.service';

@Controller('settings/address')
export class AddressController {
  constructor(
    /**inject address service */
    private readonly addressService: AddressService,
  ) {}

  @Get()
  public async getAddressById(@Param() getAddressParamDto: GetAddressParamDto) {
    return this.addressService.getAddressById(getAddressParamDto);
  }
  @Patch()
  public async updateAddress(@Body() patchAddressDto: PatchAddressDto) {
    return this.addressService.updateAddress(patchAddressDto);
  }
}
