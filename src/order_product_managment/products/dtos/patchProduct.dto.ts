import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateProductDto } from './createProduct.dto';

export class PatchProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    title: 'totalProductsSold',
    description: 'total products sold',
    example: 10,
    default: 0,
    required: false,
    type: 'number',
  })
  @IsNumber()
  @IsOptional()
  totalProductsSold?: number;
}
