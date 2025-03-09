import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { PatchGeneralSettingsDto } from '../dtos/patchGeneralSettings.dto';
import { GeneralSettings } from '../general-settings.entity';

@Injectable()
export class PatchGeneralSettings {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject address repository */
    @InjectRepository(GeneralSettings)
    private readonly GeneralSettingsRepository: Repository<GeneralSettings>,
    /**inject logger serivce */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}
  public async updateGeneralSettings(
    patchAddressDto: PatchGeneralSettingsDto,
    userId: number,
  ) {
    let user = undefined;
    let generalSettings = undefined;
    let savedGeneralSettings = undefined;
    //find the user using the user service and id from the auth token
    try {
      user = await this.usersService.findUserById(userId);
    } catch (error) {
      this.logger.error(
        'Failed to find user: Database error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    if (!user) {
      this.logger.warn(`User not found for ID ${userId} `);
      throw new UnauthorizedException('user not found', {
        description: 'error finding the user',
      });
    }

    //find the address using the user
    try {
      generalSettings = await this.GeneralSettingsRepository.findOneBy({
        id: user.generalSettings.id,
      });
    } catch (error) {
      this.logger.error(
        'Failed to find general settings: Database error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!generalSettings) {
      this.logger.warn(`General settings not found for ID ${userId} `);
      throw new UnauthorizedException('general settings not found', {
        description: 'error finding the general settings',
      });
    }
    generalSettings.businessName =
      patchAddressDto.businessName ?? generalSettings.businessName;
    generalSettings.businessDescription =
      patchAddressDto.businessDescription ??
      generalSettings.businessDescription;
    generalSettings.phoneNumber =
      patchAddressDto.phoneNumber ?? generalSettings.phoneNumber;

    try {
      savedGeneralSettings =
        await this.GeneralSettingsRepository.save(generalSettings);
    } catch (error) {
      this.logger.error(
        'Failed to update general settings: Database error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    if (!savedGeneralSettings) {
      this.logger.warn(`General settings not updated for ID ${userId} `);
      throw new BadRequestException('General settings not updated', {
        description: 'error updating the general settings',
      });
    }
    this.logger.log(`General settings updated for ID ${userId} `);
    return savedGeneralSettings;
  }
}
