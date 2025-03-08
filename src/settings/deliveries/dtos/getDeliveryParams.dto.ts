import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetDeliveryParamsDto {
  @ApiProperty({
    title: 'id',
    description: 'id of the delivery',
    example: '1',
    type: 'number',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
