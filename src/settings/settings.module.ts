import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsService } from './providers/settings.service';
import { Setting } from './setting.entity';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService],
  imports: [TypeOrmModule.forFeature([Setting])],
})
export class SettingsModule {}
