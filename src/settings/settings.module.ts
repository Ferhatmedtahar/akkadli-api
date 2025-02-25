import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController],
  providers: [],
  imports: [],
})
export class SettingsModule {}
