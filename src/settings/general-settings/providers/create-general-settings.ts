import { Body, Injectable } from '@nestjs/common';
import { GeneralSettings } from '../general-settings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeneralSettingsDto } from '../dtos/createGeneralSettings.dto';

@Injectable()
export class CreateGeneralSettings {
  constructor(
    /**inject address repository */
    @InjectRepository(GeneralSettings)
    private readonly generalSettingsRepository: Repository<GeneralSettings>,
  ) {}
  public async createGeneralSettings(
    @Body() createGeneralSettingsDto: CreateGeneralSettingsDto,
  ) {
    return await this.generalSettingsRepository.save(createGeneralSettingsDto);
  }
}
