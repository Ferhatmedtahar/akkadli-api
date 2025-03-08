import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'municipality',
    description: 'municipality of the user or the business',
    example: 'Alger',
    required: true,
    type: 'string',
  })
  municipality: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'postal code',
    description: 'postal code of the user or the business',
    example: '90000',
    required: true,
    type: 'string',
  })
  postalCode: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'wilaya',
    description: 'wilaya of the user or the business',
    example: 'Alger',
    required: true,
    type: 'string',
  })
  wilaya: string;
}
