import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetAddressParamDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    title: 'id',
    description: 'id of the address',
    example: 1,
    required: true,
    type: 'number',
  })
  @Type(() => Number)
  id: number;
}
