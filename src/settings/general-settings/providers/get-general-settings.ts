import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/logger/interfaces/logger.interface';
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
    /**inject logger serivce */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}
  public async getGeneralSettingsUser(userId: number) {
    let user = undefined;
    let generalSettings = undefined;
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
        },
      );
    }
    try {
      generalSettings = await this.generalSettingsRepository.findOneBy({
        id: user.generalSettings.id,
      });
    } catch (error) {
      this.logger.error(
        'Failed to find General Settings: Database error',
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
      this.logger.warn(`User not found for ID ${userId} `);
      throw new UnauthorizedException('user not found', {
        description: 'error finding the user',
      });
    }
    this.logger.log(`General Settings found for user ID ${userId}`);
    return generalSettings;
  }
}
