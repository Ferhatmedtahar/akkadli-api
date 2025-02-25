import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Address } from '../address.entity';
import { CreateAddressDto } from '../dtos/createAddress.dto';
import { GetAddressParamDto } from '../dtos/getAddressParam.dto';
import { PatchAddressDto } from '../dtos/patchAddress.dto';
import { CreateAddressProvider } from './create-address.provider';
import { GetAddressProvider } from './get-address.provider';
import { PatchAddressProvider } from './patch-address.provider';

@Injectable()
export class AddressService {
  constructor(
    /**inject address repository */
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject create address Provider  */
    private readonly createAddressProvider: CreateAddressProvider,
    /**inject patch address Provider*/
    private readonly patchAddressProvider: PatchAddressProvider,
    /**inject get address Provider by user id  */
    private readonly getAddressProvider: GetAddressProvider,
  ) {}
  /**
   * Get address by id
   * @param getAddressParamDto
   * @returns address
   * no need to use it on the controller since we get the address by user id only
   */
  public async getAddressById(@Param() getAddressParamDto: GetAddressParamDto) {
    return await this.addressRepository.findOneBy(getAddressParamDto);
  }

  public async getAddressByUserId() {
    return this.getAddressProvider.getAddressByUserId();
  }
  public async createAddress(@Body() createAddressDto: CreateAddressDto) {
    return this.createAddressProvider.createAddress(createAddressDto);
  }

  public async updateAddress(@Body() patchAddressDto: PatchAddressDto) {
    return this.patchAddressProvider.updateAddress(patchAddressDto);
  }
}
