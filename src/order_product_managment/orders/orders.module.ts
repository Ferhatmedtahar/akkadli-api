import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { OrderProductModule } from '../order-product/order-product.module';
import { ProductsModule } from '../products/products.module';
import { Order } from './order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './providers/orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order]),
    ProductsModule,
    OrderProductModule,
    UsersModule,
  ],
})
export class OrdersModule {}
