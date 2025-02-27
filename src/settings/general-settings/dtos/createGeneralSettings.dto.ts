import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateGeneralSettingsDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(\+213|0)(5|6|7)[0-9]{8}$/, {
    message: 'Please enter a valid phone number',
  })
  phoneNumber: string;
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @IsString()
  @IsOptional()
  businessDescription?: string;
}
