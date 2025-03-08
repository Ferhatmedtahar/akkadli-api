import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Address } from '../address.entity';
import { PatchAddressDto } from '../dtos/patchAddress.dto';

@Injectable()
export class PatchAddressProvider {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject address repository */
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  public async updateAddress(patchAddressDto: PatchAddressDto, userId: number) {
    let user = undefined;
    let updatedAddress = undefined;
    //find the user using the user service and id from the auth token
    try {
      user = await this.usersService.findUserById(userId);
    } catch {
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!user) {
      throw new BadRequestException('user not found', {
        description: 'error finding the user',
      });
    }
    //find the address using the user
    try {
      updatedAddress = await this.addressRepository.findOne({
        where: { id: user.address.id },
      });
    } catch {
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!updatedAddress) {
      throw new BadRequestException('address not found', {
        description: 'error finding the user',
      });
    }
    //update the address
    updatedAddress.wilaya = patchAddressDto.wilaya || updatedAddress.wilaya;
    updatedAddress.municipality =
      patchAddressDto.municipality || updatedAddress.municipality;
    updatedAddress.postalCode =
      patchAddressDto.postalCode || updatedAddress.postalCode;

    //save the address
    try {
      updatedAddress = await this.addressRepository.save(updatedAddress);
    } catch {
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    return updatedAddress;
  }
}
