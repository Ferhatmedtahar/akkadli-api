import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralSettingsController } from './general-settings.controller';
import { GeneralSettings } from './general-settings.entity';
import { GeneralSettingsService } from './providers/general_settings.service';
import { CreateGeneralSettings } from './providers/create-general-settings';
import { GetGeneralSettings } from './providers/get-general-settings';
import { PatchGeneralSettings } from './providers/patch-general-settings';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [GeneralSettingsController],
  providers: [
    GeneralSettingsService,
    CreateGeneralSettings,
    GetGeneralSettings,
    PatchGeneralSettings,
  ],
  imports: [TypeOrmModule.forFeature([GeneralSettings]), UsersModule],
})
export class GeneralSettingsModule {}
