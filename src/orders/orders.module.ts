import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './providers/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrdersModule {}
