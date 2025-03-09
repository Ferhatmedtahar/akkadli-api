import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Patch,
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
import { PatchGeneralSettingsDto } from './dtos/patchGeneralSettings.dto';
import { GeneralSettingsService } from './providers/general_settings.service';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { GetIp } from 'src/auth/decorators/get-ip.decorator.decorator';

@Controller('settings/general-settings')
@ApiTags('General Settings')
export class GeneralSettingsController {
  constructor(
    /**inject general settings service */
    private readonly generalSettingsService: GeneralSettingsService,
    /**inject logger serivce */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}
  // @UseGuards(AccessTokenGuard)
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
  @ApiOperation({
    summary: 'Get General Settings of the current user',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  public async getGeneralSettings(
    @ActiveUser() user: ActiveUserData,
    @GetIp() ip: string,
  ) {
    this.logger.logRequest(
      'get user general settings',
      GeneralSettingsController.name,
      ip,
      {
        userId: user.sub,
      },
    );
    return this.generalSettingsService.getGeneralSettingsUser(user.sub);
  }

  @Patch()
  @ApiBearerAuth('access-token')
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
    @GetIp() ip: string,
  ) {
    this.logger.logRequest(
      'update user general settings',
      GeneralSettingsController.name,
      ip,
      {
        userId: user.sub,
      },
    );
    return this.generalSettingsService.updateGeneralSetting(
      patchGeneralSettingsDto,
      user,
    );
  }
}
