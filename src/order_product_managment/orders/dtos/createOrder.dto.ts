import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderProductDto } from 'src/order_product_managment/order-product/dtos/createOrderProdut.dto';
import { OrderStatus } from '../enums/orderStatus.enum'; // Adjust based on where OrderStatus is defined

export class CreateOrderDto {
  @IsString()
  customerName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsBoolean()
  isExternal?: boolean;

  @IsOptional()
  @IsString()
  externalTrackingId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
}
