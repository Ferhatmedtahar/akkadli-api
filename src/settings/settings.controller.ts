import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('settings')
@ApiTags('Settings')
export class SettingsController {}
