import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { OrderProductModule } from '../order-product/order-product.module';
import { ProductsModule } from '../products/products.module';
import { Order } from './order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './providers/orders.service';
import { GetOrderProvider } from './providers/get-order.provider';
import { CreateOrderProvider } from './providers/create-order.provider';
import { UpdateOrderProvider } from './providers/update-order.provider';
import { DeleteOrderProvider } from './providers/delete-order.provider';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, GetOrderProvider, CreateOrderProvider, UpdateOrderProvider, DeleteOrderProvider],
  imports: [
    TypeOrmModule.forFeature([Order]),
    ProductsModule,
    OrderProductModule,
    UsersModule,
  ],
})
export class OrdersModule {}
