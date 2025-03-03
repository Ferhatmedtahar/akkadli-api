import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GeneralSettings } from '../general-settings.entity';

@Injectable()
export class GetGeneralSettings {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject address repository */
    @InjectRepository(GeneralSettings)
    private readonly generalSettingsRepository: Repository<GeneralSettings>,
  ) {}
  public async getGeneralSettingsByUserId() {
    let user = undefined;
    let generalSettings = undefined;
    //TODO replace the static user id with the id from the request after authentication

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
    try {
      generalSettings = await this.generalSettingsRepository.findOneBy({
        id: user.generalSettings.id,
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    return generalSettings;
  }
}
