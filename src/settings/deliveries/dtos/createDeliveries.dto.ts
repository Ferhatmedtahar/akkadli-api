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
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  apiId: string;
  @IsString()
  @IsNotEmpty()
  apiToken: string;
}
