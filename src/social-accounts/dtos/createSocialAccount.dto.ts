import { IsEnum, IsInt, IsString } from 'class-validator';

export class CreateSocialAccountDto {
  @IsInt()
  userId: number;
  @IsString()
  @IsEnum(['facebook', 'instagram', 'whatsapp'])
  platform: string;
  @IsString()
  accessToken: string;
  @IsString()
  accountName: string;
  @IsInt()
  accountId: string;
}
