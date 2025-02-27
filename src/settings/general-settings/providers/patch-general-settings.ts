import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GeneralSettings } from '../general-settings.entity';
import { PatchGeneralSettingsDto } from '../dtos/patchGeneralSettings.dto';

@Injectable()
export class PatchGeneralSettings {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject address repository */
    @InjectRepository(GeneralSettings)
    private readonly addressRepository: Repository<GeneralSettings>,
  ) {}
  public async updateGeneralSettings(
    @Body() patchAddressDto: PatchGeneralSettingsDto,
  ) {
    //find the user using the user service and id from the auth token
    const user = await this.usersService.findUserById(19);
    console.log(user);
    //find the address using the user
    const generalSettings = await this.addressRepository.findOneById(
      user.generalSettings.id,
    );
    generalSettings.businessName =
      patchAddressDto.businessName || generalSettings.businessName;
    generalSettings.businessDescription =
      patchAddressDto.businessDescription ||
      generalSettings.businessDescription;
    generalSettings.phoneNumber =
      patchAddressDto.phoneNumber || generalSettings.phoneNumber;
    return await this.addressRepository.save(generalSettings);
  }
}
