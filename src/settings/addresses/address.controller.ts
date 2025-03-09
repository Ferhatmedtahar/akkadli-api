import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { PatchAddressDto } from './dtos/patchAddress.dto';
import { AddressService } from './providers/address.service';
import { ILogger } from 'src/logger/interfaces/logger.interface';

@Controller('settings/address')
export class AddressController {
  constructor(
    /**inject address service */
    private readonly addressService: AddressService,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}

  @Get()
  @ApiBearerAuth('access-token')
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
    this.logger.log('get address by user id', AddressController.name, {
      userId: user.sub,
    });
    return this.addressService.getAddressByUserId(user.sub);
  }

  @Patch()
  @ApiBearerAuth('access-token')
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
    this.logger.log('update address by user id', AddressController.name, {
      userId: user.sub,
    });
    return this.addressService.updateAddress(patchAddressDto, user.sub);
  }
}
