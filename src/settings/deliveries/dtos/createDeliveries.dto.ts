import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DeliveryNames } from '../enums/delivery_names.enum';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(DeliveryNames)
  @ApiProperty({
    enum: DeliveryNames,
    description: 'name of the delivery',
    example: 'Yalidine',
    required: true,
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'api id',
    description: 'api id of the delivery',
    example: '123381239k',
    required: true,
    type: 'string',
  })
  apiId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'api token',
    description: 'api token of the delivery',
    example: '12338drfsa',
    required: true,
    type: 'string',
  })
  apiToken: string;
}
