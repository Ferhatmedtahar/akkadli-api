import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { SettingsService } from './settings.service';

@Controller('settings')
@ApiTags('Settings')
export class SettingsController {
  constructor(
    /**inject settings service */
    private readonly settingsService: SettingsService,
  ) {}
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getSettings(@ActiveUser() user: ActiveUserData) {
    return this.settingsService.getUserSettings(user.sub);
  }
}
