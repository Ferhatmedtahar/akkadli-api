import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  min,
} from 'class-validator';
import { ProductSize } from '../enums/productSize';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    title: 'productName',
    description: 'name of the product',
    example: 'product 1',
    required: true,
    type: 'string',
  })
  productName: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'description',
    description: 'description of the product',
    example: 'product 1 description',
    required: false,
    type: 'string',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'color',
    description: 'color of the product',
    example: 'red',
    required: false,
    type: 'string',
  })
  color?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'size',
    enum: ProductSize,
    default: ProductSize.SMALL,
    description: 'size of the product',
    example: 'small',
    required: false,
    type: 'string',
  })
  size?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    title: 'heavyWeight',
    description: 'is the product heavy ?(more then 5kg)',
    example: true,
    required: false,
    type: 'boolean',
  })
  heavyWeight?: boolean;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    title: 'price',
    description: 'price of the product',
    example: 100,
    required: true,
    type: 'number',
  })
  price: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    title: 'discount',
    description:
      'discount of the product(0 is the default value, 1 is the max value)',
    default: 0,
    example: 0.1,
    maximum: 1,
    minimum: 0,
    required: false,
    type: 'number',
  })
  discount?: number;

  @ApiProperty({
    title: 'quantity',
    description: 'quantity of the product',
    example: 10,
    required: true,
    type: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    title: 'totalProductsSold',
    description: 'total products sold',
    example: 10,
    default: 0,
    required: true,
    type: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  totalProductsSold: number;
  @ApiPropertyOptional({
    title: 'imageUrl',
    description: 'image url of the product',
    example: 'https://example.com/image.jpg',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
