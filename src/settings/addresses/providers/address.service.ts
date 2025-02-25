import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Address } from '../address.entity';
import { CreateAddressDto } from '../dtos/createAddress.dto';
import { GetAddressParamDto } from '../dtos/getAddressParam.dto';
import { PatchAddressDto } from '../dtos/patchAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    /**inject address repository */
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    /**inject user service */
    private readonly usersService: UsersService,
  ) {}
  public async getAddressById(@Param() getAddressParamDto: GetAddressParamDto) {
    return await this.addressRepository.findOneBy(getAddressParamDto);
  }

  public async createAddress(@Body() createAddressDto: CreateAddressDto) {
    return await this.addressRepository.save(createAddressDto);
  }

  public async updateAddress(@Body() patchAddressDto: PatchAddressDto) {
    //find the user using the user service and id from the auth token
    const user = await this.usersService.findUserById(12);

    //find the address using the user
    const address = await this.addressRepository.findOneById(user.address.id);
    address.wilaya = patchAddressDto.wilaya || address.wilaya;
    address.municipality = patchAddressDto.municipality || address.municipality;
    address.postalCode = patchAddressDto.postalCode || address.postalCode;

    return await this.addressRepository.save(address);
  }
}
