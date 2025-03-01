import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetProductParamsDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    title: 'id',
    description: 'id of the product',
    example: 1,
    required: true,
    type: 'number',
  })
  @Type(() => Number)
  id: number;
}
