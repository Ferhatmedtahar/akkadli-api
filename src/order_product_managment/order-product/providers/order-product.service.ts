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

  public async getTotalOrderedQuantity(productId: number): Promise<number> {
    const result = await this.orderProductRepository
      .createQueryBuilder('orderProduct')
      .select('SUM(orderProduct.quantity)', 'total')
      .where('orderProduct.productId = :productId', { productId })
      .andWhere('orderProduct.deletedAt IS NULL')
      .getRawOne<{ total: string | null }>(); // Ensure type safety

    return result.total ? Number(result.total) : 0; // Convert to number & handle null
  }
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

  public async removeOrderProduct(id: number) {
    return await this.orderProductRepository.delete(id);
  }
  public async findByOrderId(id: number) {
    return await this.orderProductRepository.find({
      where: { order: { id } },
      relations: { order: true, product: true },
    });
  }
  public async findProductOrderById(id: number) {
    return await this.orderProductRepository.find({
      where: { id },
      relations: { order: true, product: true },
    });
  }
}
