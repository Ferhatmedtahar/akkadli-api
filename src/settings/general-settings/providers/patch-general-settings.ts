import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    private readonly addressRepository: Repository<GeneralSettings>,
  ) {}
  public async updateGeneralSettings(
    @Body() patchAddressDto: PatchGeneralSettingsDto,
  ) {
    let user = undefined;
    let generalSettings = undefined;
    let savedGeneralSettings = undefined;
    //find the user using the user service and id from the auth token
    try {
      user = await this.usersService.findUserById(19);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    if (!user) {
      throw new UnauthorizedException('user not found', {
        description: 'error finding the user',
      });
    }

    //find the address using the user
    try {
      generalSettings = await this.addressRepository.findOneById(
        user.generalSettings.id,
      );
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!generalSettings) {
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
      savedGeneralSettings = await this.addressRepository.save(generalSettings);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    if (!savedGeneralSettings) {
      throw new UnauthorizedException('general settings not found', {
        description: 'error finding the general settings',
      });
    }
    if (!savedGeneralSettings) {
      throw new BadRequestException('General settings not updated', {
        description: 'error updating the general settings',
      });
    }
    return savedGeneralSettings;
  }
}
