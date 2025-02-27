import { PartialType } from '@nestjs/swagger';
import { CreateGeneralSettingsDto } from './createGeneralSettings.dto';

export class PatchGeneralSettingsDto extends PartialType(
  CreateGeneralSettingsDto,
) {}
