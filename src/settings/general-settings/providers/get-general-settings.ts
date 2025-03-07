import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GeneralSettings } from '../general-settings.entity';

@Injectable()
export class GetGeneralSettingsProvider {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject address repository */
    @InjectRepository(GeneralSettings)
    private readonly generalSettingsRepository: Repository<GeneralSettings>,
  ) {}
  public async getGeneralSettingsUser(userId: number) {
    console.log(userId);
    let user = undefined;
    let generalSettings = undefined;
    try {
      user = await this.usersService.findUserById(userId);
      console.log(user);
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
    if (!generalSettings) {
      throw new UnauthorizedException('user not found', {
        description: 'error finding the user',
      });
    }
    return generalSettings;
  }
}
