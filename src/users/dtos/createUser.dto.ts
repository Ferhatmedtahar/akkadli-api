import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateAddressDto } from 'src/settings/addresses/dtos/createAddress.dto';
import { CreateGeneralSettingsDto } from 'src/settings/general-settings/dtos/createGeneralSettings.dto';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @MinLength(3)
  @ApiProperty({
    minLength: 3,
    maxLength: 128,
    type: 'string',
    required: true,
    example: 'Evans',
    description: 'first name of the user',
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(128)
  @ApiProperty({
    minLength: 3,
    maxLength: 128,
    type: 'string',
    required: false,
    example: 'Islam',
    description: 'last name of the user',
  })
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'evans.example@gmail.com',
    description: 'email of the user',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    example: '123456789',
    description: 'googleId of the user',
  })
  googleId: string;

  @IsString()
  @IsOptional()
  @MaxLength(1024)
  @ApiProperty({
    maxLength: 1024,
    type: 'string',
    required: false,
    example: 'https://imgur.com/gallery/mrw-this-user-name-was-available-QgFmh',
    description: 'profile picture url of the user',
  })
  publicProfileUrl?: string;

  @IsOptional()
  @ApiProperty({
    type: CreateAddressDto,
    required: false,
    example: {
      municipality: 'Laghouat',
      wilaya: 'Laghouat',
      postalCode: '03000',
    },
    description:
      'user address, not required because it will be created automatically with the default address and the user have to manually update it using /settings/address endpoint',
  })
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;

  @IsOptional()
  @ApiProperty({
    type: CreateGeneralSettingsDto,
    required: false,
    example: {
      phoneNumber: '+213550123450',
      businessName: 'My Business Name',
      businessDescription: 'My Business Description testing 123',
    },
    description:
      'user address, not required because it will be created automatically with the default General settings and the user have to manually update it using /settings/general-settings endpoint',
  })
  @Type(() => CreateGeneralSettingsDto)
  generalSettings?: CreateGeneralSettingsDto;
}
