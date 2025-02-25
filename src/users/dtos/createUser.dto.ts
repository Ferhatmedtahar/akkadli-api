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
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(128)
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  googleId: string;

  @IsOptional()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;
}
