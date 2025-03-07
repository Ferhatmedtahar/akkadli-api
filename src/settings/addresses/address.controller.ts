import { Body, Controller, Get, Patch } from '@nestjs/common';
import { PatchAddressDto } from './dtos/patchAddress.dto';
import { AddressService } from './providers/address.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('settings/address')
export class AddressController {
  constructor(
    /**inject address service */
    private readonly addressService: AddressService,
  ) {}

  @Get()
  public async getAddressByUserId(@ActiveUser() user: ActiveUserData) {
    return this.addressService.getAddressByUserId(user.sub);
  }
  @Patch()
  public async updateAddress(
    @Body() patchAddressDto: PatchAddressDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.addressService.updateAddress(patchAddressDto, user.sub);
  }
  // public async getAddressById(@Param() getAddressParamDto: GetAddressParamDto) {
  //   return this.addressService.getAddressById(getAddressParamDto);
  // }
}
