import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralSettingsController } from './general-settings.controller';
import { GeneralSettings } from './general-settings.entity';
import { GeneralSettingsService } from './providers/general_settings.service';

import { UsersModule } from 'src/users/users.module';
import { GetGeneralSettings } from './providers/get-general-settings';
import { PatchGeneralSettings } from './providers/patch-general-settings';

@Module({
  controllers: [GeneralSettingsController],
  providers: [GeneralSettingsService, GetGeneralSettings, PatchGeneralSettings],
  imports: [TypeOrmModule.forFeature([GeneralSettings]), UsersModule],
})
export class GeneralSettingsModule {}
