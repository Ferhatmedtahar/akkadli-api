import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductController } from './order-product.controller';
import { OrderProduct } from './order-product.entity';
import { OrderProductService } from './providers/order-product.service';

@Module({
  controllers: [OrderProductController],
  providers: [OrderProductService],
  imports: [TypeOrmModule.forFeature([OrderProduct])],
  exports: [OrderProductService],
})
export class OrderProductModule {}
