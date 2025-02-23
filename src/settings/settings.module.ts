import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './providers/settings.service';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
