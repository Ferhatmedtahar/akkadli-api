import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSettingDto } from '../dtos/createSetting.dto';
import { Setting } from '../setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    /**
  inject setting repository */
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}
  public async createSetting(@Body() createsettingDto: CreateSettingDto) {
    const setting = this.settingRepository.create(createsettingDto);
    await this.settingRepository.save(setting);
    return setting;
  }
}
