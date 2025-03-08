import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateGeneralSettingsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'phone number',
    description: 'phone number of the user or the business',
    example: '+213 55 55 55 55',
    required: true,
    type: 'string',
    pattern: '^(\+213|0)(5|6|7)[0-9]{8}$',
  })
  @Matches(/^(\+213|0)(5|6|7)[0-9]{8}$/, {
    message: 'Please enter a valid phone number',
  })
  phoneNumber: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'business name',
    description: 'name of the business',
    example: 'My Business',
    required: true,
    type: 'string',
  })
  businessName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    title: 'business description',
    description: 'description of the business',
    example: 'My Business Description',
    required: false,
    type: 'string',
  })
  businessDescription?: string;
}
