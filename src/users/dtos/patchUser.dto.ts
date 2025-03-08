import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from './createUser.dto';
export class PatchUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @MaxLength(128)
  @MinLength(3)
  @ApiProperty({
    minLength: 3,
    maxLength: 128,
    type: 'string',
    required: false,
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
}
