import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../address.entity';
import { CreateAddressDto } from '../dtos/createAddress.dto';

@Injectable()
export class CreateAddressProvider {
  constructor(
    /**inject address repository */
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  public async createAddress(@Body() createAddressDto: CreateAddressDto) {
    return await this.addressRepository.save(createAddressDto);
  }
}
