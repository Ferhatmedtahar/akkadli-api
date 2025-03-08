import { Injectable } from '@nestjs/common';
import { PatchGeneralSettingsDto } from '../dtos/patchGeneralSettings.dto';

import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { GetGeneralSettingsProvider } from './get-general-settings';
import { PatchGeneralSettings } from './patch-general-settings';

@Injectable()
export class GeneralSettingsService {
  constructor(
    /**inject get GeneralSettings by user id provider */
    private readonly getGeneralSettings: GetGeneralSettingsProvider,
    /**inject patch GeneralSettings provider */
    private readonly patchGeneralSettings: PatchGeneralSettings,
  ) {}

  public async getGeneralSettingsUser(user: number) {
    return this.getGeneralSettings.getGeneralSettingsUser(user);
  }
  public async updateGeneralSetting(
    patchGeneralSettingsDto: PatchGeneralSettingsDto,
    user: ActiveUserData,
  ) {
    return this.patchGeneralSettings.updateGeneralSettings(
      patchGeneralSettingsDto,
      user.sub,
    );
  }
}
