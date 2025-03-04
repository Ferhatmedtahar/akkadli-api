import { IsNumber, Min } from 'class-validator';
import { Order } from 'src/order_product_managment/orders/order.entity';
import { Product } from 'src/order_product_managment/products/product.entity';

export class CreateOrderProviderDto {
  order: Order;
  product: Product;
  @IsNumber()
  @Min(1)
  quantity: number;
  @IsNumber()
  priceAtPurchase: number;
}
