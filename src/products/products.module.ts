import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './providers/products.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product]), UsersModule],
})
export class ProductsModule {}
