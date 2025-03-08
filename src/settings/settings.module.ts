import { Module } from '@nestjs/common';
import { AddressModule } from './addresses/address.module';
import { GeneralSettingsModule } from './general-settings/general_settings.module';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
@Module({
  controllers: [SettingsController],
  providers: [SettingsService],
  imports: [GeneralSettingsModule, AddressModule],
})
export class SettingsModule {}
