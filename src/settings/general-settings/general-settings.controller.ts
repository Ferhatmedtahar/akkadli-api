import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Get General Settings of the current user',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  public async getGeneralSettings(@ActiveUser() user: ActiveUserData) {
    return this.generalSettingsService.getGeneralSettingsUser(user.sub);
  }

  @Patch()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,

    example:
      ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiResponse({ status: 400, description: 'general settings not updated' })
  @ApiResponse({ status: 401, description: 'general settings not found' })
  @ApiOperation({
    summary: 'Update General Settings of the current user',
  })
  @ApiResponse({
    status: 200,
    description: 'general settings updated successfully',
  })
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
