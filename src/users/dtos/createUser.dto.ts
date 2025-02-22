import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
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
}
