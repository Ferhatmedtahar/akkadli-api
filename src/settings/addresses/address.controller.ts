import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { PatchAddressDto } from './dtos/patchAddress.dto';
import { AddressService } from './providers/address.service';

@Controller('settings/address')
export class AddressController {
  constructor(
    /**inject address service */
    private readonly addressService: AddressService,
  ) {}

  @Get()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,

    example:
      ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiResponse({ status: 400, description: ' address not found' })
  @ApiResponse({ status: 401, description: 'address not found' })
  @ApiResponse({ status: 200, description: 'address found' })
  @ApiOperation({ summary: 'get address by user id' })
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAddressByUserId(@ActiveUser() user: ActiveUserData) {
    return this.addressService.getAddressByUserId(user.sub);
  }

  @Patch()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,

    example:
      ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiResponse({ status: 200, description: 'address updated' })
  @ApiResponse({ status: 400, description: ' address not found' })
  @ApiOperation({ summary: 'update address by user id' })
  @UseInterceptors(ClassSerializerInterceptor)
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
