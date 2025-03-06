import { Body, Controller, Get, Patch } from '@nestjs/common';
import { PatchGeneralSettingsDto } from './dtos/patchGeneralSettings.dto';
import { GeneralSettingsService } from './providers/general_settings.service';

@Controller('settings/general-settings')
export class GeneralSettingsController {
  constructor(
    /**inject general settings service */
    private readonly generalSettingsService: GeneralSettingsService,
  ) {}
  // @UseGuards(AccessTokenGuard)
  @Get()
  public async getGeneralSettings() {
    return this.generalSettingsService.getAddressByUserId();
  }

  @Patch()
  public async updateGeneralSettings(
    @Body() patchGeneralSettingsDto: PatchGeneralSettingsDto,
  ) {
    return this.generalSettingsService.updateGeneralSetting(
      patchGeneralSettingsDto,
    );
  }
}
