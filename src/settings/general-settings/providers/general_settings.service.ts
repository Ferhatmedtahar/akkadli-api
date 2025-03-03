import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatchGeneralSettingsDto } from '../dtos/patchGeneralSettings.dto';
import { GeneralSettings } from '../general-settings.entity';

import { GetGeneralSettings } from './get-general-settings';
import { PatchGeneralSettings } from './patch-general-settings';

@Injectable()
export class GeneralSettingsService {
  constructor(
    /**inject address repository */
    @InjectRepository(GeneralSettings)
    /**inject get GeneralSettings by user id provider */
    private readonly getGeneralSettings: GetGeneralSettings,
    /**inject patch GeneralSettings provider */
    private readonly patchGeneralSettings: PatchGeneralSettings,
  ) {}

  public async getAddressByUserId() {
    return this.getGeneralSettings.getGeneralSettingsByUserId();
  }
  public async updateGeneralSetting(
    @Body() patchGeneralSettingsDto: PatchGeneralSettingsDto,
  ) {
    return this.patchGeneralSettings.updateGeneralSettings(
      patchGeneralSettingsDto,
    );
  }
}
