import { Injectable } from '@nestjs/common';
import { GeneralSettingsService } from './general-settings/providers/general_settings.service';
import { AddressService } from './addresses/providers/address.service';

@Injectable()
export class SettingsService {
  constructor(
    /**inject generalSettings */
    private readonly generalSettings: GeneralSettingsService,
    /**inject address Serivce */
    private readonly addressService: AddressService,
  ) {}
  public getUserSettings(userId: number) {
    return Promise.all([
      this.addressService.getAddressByUserId(userId),
      this.generalSettings.getGeneralSettingsUser(userId),
    ]);
  }
}
