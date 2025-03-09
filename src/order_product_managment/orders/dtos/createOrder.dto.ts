import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { OrderProductDto } from 'src/order_product_managment/order-product/dtos/createOrderProdut.dto';
import { OrderStatus } from '../enums/orderStatus.enum'; // Adjust based on where OrderStatus is defined

export class CreateOrderDto {
  @ApiProperty({
    type: 'string',
    description: 'The name of the customer',
    example: 'John Doe',
    required: true,
    maxLength: 255,
    title: 'customerName',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  customerName: string;

  @ApiProperty({
    title: 'phoneNumber',
    description: 'phone number of the user or the business',
    maxLength: 32,
    example: '+213 55 55 55 55',
    required: true,
    type: 'string',
    pattern: '^(\+213|0)(5|6|7)[0-9]{8}$',
  })
  @Matches(/^(\+213|0)(5|6|7)[0-9]{8}$/, {
    message: 'Please enter a valid phone number',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: 'string',
    description: 'The address of the customer',
    example: 'Alger, Algeria,03000',
    required: true,
    title: 'address',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: 'string',
    enum: OrderStatus,
    description: 'The status of the order',
    required: false,
    title: 'status',
    example: OrderStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({
    type: 'boolean',
    description: 'The status of the order',
    required: false,

    title: 'isExternal',
    default: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isExternal?: boolean;

  @ApiProperty({
    type: 'string',
    description: 'The tracking id of the order',
    required: false,
    maxLength: 256,
    title: 'externalTrackingId',
    example: '123456789YALI',
  })
  @IsOptional()
  @IsString()
  externalTrackingId?: string;

  @ApiProperty({
    type: 'array',
    description: 'The products of the order',
    required: true,
    title: 'products',

    example: [
      {
        productId: 1,
        quantity: 2,
      },
    ],
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
}
