import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeneralSettingsDto } from '../dtos/createGeneralSettings.dto';
import { PatchGeneralSettingsDto } from '../dtos/patchGeneralSettings.dto';
import { GeneralSettings } from '../general-settings.entity';
import { CreateGeneralSettings } from './create-general-settings';
import { GetGeneralSettings } from './get-general-settings';
import { PatchGeneralSettings } from './patch-general-settings';

@Injectable()
export class GeneralSettingsService {
  constructor(
    /**inject address repository */
    @InjectRepository(GeneralSettings)
    private readonly generalSettingsRepository: Repository<GeneralSettings>,
    /**inject get GeneralSettings by user id provider */
    private readonly getGeneralSettings: GetGeneralSettings,
    /**inject create general settings provider */
    private readonly createGeneralSettings: CreateGeneralSettings,
    /**inject patch GeneralSettings provider */
    private readonly patchGeneralSettings: PatchGeneralSettings,
  ) {}
  // public async getAddressById(
  //   @Param() getGeneralSettingsParamDto: GetGeneralSettingsParamDto,
  // ) {
  //   return await this.generalSettingsRepository.findOneBy(
  //     getGeneralSettingsParamDto,
  //   );
  // }

  public async getAddressByUserId() {
    return this.getGeneralSettings.getGeneralSettingsByUserId();
  }

  public async createGeneralSetting(
    @Body() createGeneralSettingsDto: CreateGeneralSettingsDto,
  ) {
    return this.createGeneralSettings.createGeneralSettings(
      createGeneralSettingsDto,
    );
  }

  public async updateGeneralSetting(
    @Body() patchGeneralSettingsDto: PatchGeneralSettingsDto,
  ) {
    return this.patchGeneralSettings.updateGeneralSettings(
      patchGeneralSettingsDto,
    );
  }
}
