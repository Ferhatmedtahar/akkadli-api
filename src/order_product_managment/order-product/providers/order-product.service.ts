import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderProviderDto } from '../dtos/createOrderProductProvider.dto';
import { OrderProduct } from '../order-product.entity';

@Injectable()
export class OrderProductService {
  constructor(
    /**inject order product repository */
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
  ) {}

  public async createOrderProductProvider(
    createOrderProviderDto: CreateOrderProviderDto,
  ) {
    return this.orderProductRepository.create({
      order: createOrderProviderDto.order, // Explicitly set the saved Order
      product: createOrderProviderDto.product, // Explicitly set the Product entity
      quantity: createOrderProviderDto.quantity,
      priceAtPurchase: createOrderProviderDto.priceAtPurchase,
    });
  }

  public async updateOrderProductProvider(orderProduct: OrderProduct) {
    return await this.orderProductRepository.save(orderProduct);
  }
  public async saveOrderProduct(orderProducts: OrderProduct[]) {
    return await this.orderProductRepository.save(orderProducts);
  }

  public async findProductOrderById(id: number) {
    return await this.orderProductRepository.find({
      where: { id },
      relations: { order: true, product: true },
    });
  }
}
