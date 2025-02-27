import { Injectable } from '@nestjs/common';
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
    //TODO replace the static user id with the id from the request after authentication
    const user = await this.usersService.findUserById(19);
    return await this.generalSettingsRepository.findOneBy({
      id: user.generalSettings.id,
    });
  }
}
