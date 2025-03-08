import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @ApiProperty({
    required: false,
    type: Number,
    minimum: 1,
    default: 1,
    example: 1,
    title: 'page',
    description: 'page number',
  })
  page?: number = 1;
  @ApiProperty({
    required: false,
    type: Number,
    minimum: 1,
    default: 10,
    example: 10,
    description: 'limit number',
    title: 'limit',
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit?: number = 10;
}
