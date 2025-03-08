import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { PatchGeneralSettingsDto } from './dtos/patchGeneralSettings.dto';
import { GeneralSettingsService } from './providers/general_settings.service';

@Controller('settings/general-settings')
@ApiTags('General Settings')
export class GeneralSettingsController {
  constructor(
    /**inject general settings service */
    private readonly generalSettingsService: GeneralSettingsService,
  ) {}
  // @UseGuards(AccessTokenGuard)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public async getGeneralSettings(@ActiveUser() user: ActiveUserData) {
    return this.generalSettingsService.getGeneralSettingsUser(user.sub);
  }

  @Patch()
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateGeneralSettings(
    @Body() patchGeneralSettingsDto: PatchGeneralSettingsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.generalSettingsService.updateGeneralSetting(
      patchGeneralSettingsDto,
      user,
    );
  }
}
