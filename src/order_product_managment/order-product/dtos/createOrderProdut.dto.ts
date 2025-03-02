import { IsNumber } from 'class-validator';

export class OrderProductDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}
