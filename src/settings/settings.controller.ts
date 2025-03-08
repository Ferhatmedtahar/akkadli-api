import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,

    example:
      ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
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
