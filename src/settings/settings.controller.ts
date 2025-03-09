import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'user Address and General Settings',
  })
  @ApiResponse({ status: 401, description: 'user not found' })
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiOperation({ summary: 'get user Address and General Settings' })
  @UseInterceptors(ClassSerializerInterceptor)
  getSettings(@ActiveUser() user: ActiveUserData) {
    return this.settingsService.getUserSettings(user.sub);
  }
}
