import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { ProductsService } from 'src/order_product_managment/products/providers/products.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dtos/createOrder.dto';
import { OrderStatus } from '../enums/orderStatus.enum';
import { Order } from '../order.entity';

@Injectable()
export class OrdersService {
  constructor(
    /**inject order repository */
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    /**inject product service */
    private readonly productService: ProductsService,
    /**inject order product service */
    private readonly orderProductService: OrderProductService,
  ) {}

  public async createOrder(@Body() createOrderDto: CreateOrderDto) {
    // Step 1: Create the Order entity
    const order = this.orderRepository.create({
      customerName: createOrderDto.customerName,
      phoneNumber: createOrderDto.phoneNumber,
      address: createOrderDto.address,
      status: createOrderDto.status || OrderStatus.PENDING,
      isExternal: createOrderDto.isExternal || false,
      externalTrackingId: createOrderDto.externalTrackingId,
    });
    //should call diff provider for each external order
    // Step 2: Save the Order to get an ID

    const savedOrder = await this.orderRepository.save(order);

    // Step 3: Create and link OrderProduct entries

    const orderProducts = await Promise.all(
      createOrderDto.products.map(async (p) => {
        const product = await this.productService.getProductById({
          id: p.productId,
        });

        if (!product) {
          throw new NotFoundException(
            `Product with id ${p.productId} not found`,
          );
        }

        const orderProduct =
          this.orderProductService.createOrderProductProvider({
            order: savedOrder,
            product,
            quantity: p.quantity,
            priceAtPurchase: product.price,
          });

        return orderProduct;
      }),
    );

    // Step 4: Save all OrderProduct entries
    this.orderProductService.saveOrderProduct(orderProducts);

    // Step 5: Return the order with its orderProducts
    savedOrder.orderProducts = orderProducts;
    return savedOrder;
  }
}
