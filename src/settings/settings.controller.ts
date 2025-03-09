import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { SettingsService } from './settings.service';

@Controller('settings')
@ApiTags('Settings')
export class SettingsController {
  constructor(
    /**inject settings service */
    private readonly settingsService: SettingsService,
    /**inject logger serivce */
    @Inject('ILogger') private readonly logger: ILogger,
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
    this.logger.log('get user settings', SettingsController.name, {
      userId: user.sub,
    });
    return this.settingsService.getUserSettings(user.sub);
  }
}
