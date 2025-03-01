import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { OrderProductModule } from '../order-product/order-product.module';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './providers/products.service';
import { UpdateProductProvider } from './providers/update-product.provider';
import { CreateProductProvider } from './providers/create-product.provider';
import { GetProductProvider } from './providers/get-product.provider';
import { DeleteProductProvider } from './providers/delete-product.provider';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, UpdateProductProvider, CreateProductProvider, GetProductProvider, DeleteProductProvider],
  imports: [
    TypeOrmModule.forFeature([Product]),
    UsersModule,
    OrderProductModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
