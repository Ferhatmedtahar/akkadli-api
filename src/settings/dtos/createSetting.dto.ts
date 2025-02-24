import { IsString } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  city: string;
}
