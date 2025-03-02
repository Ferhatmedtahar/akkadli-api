import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { ProductsService } from 'src/order_product_managment/products/providers/products.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dtos/createOrder.dto';
import { OrderStatus } from '../enums/orderStatus.enum';
import { Order } from '../order.entity';

@Injectable()
export class CreateOrderProvider {
  constructor(
    /**inject order repository */
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    /**inject product service */
    private readonly productService: ProductsService,
    /**inject order product service */
    private readonly orderProductService: OrderProductService,

    /**inject user service */
    private readonly usersService: UsersService,
  ) {}

  public async createOrder(@Body() createOrderDto: CreateOrderDto) {
    if (createOrderDto.products.length <= 0) {
      throw new NotFoundException('Order cannot be empty');
    }

    // Step 1 : Get the user
    const user = await this.usersService.findUserById(19);
    // Step 2: Create the Order entity
    const order = this.orderRepository.create({
      customerName: createOrderDto.customerName,
      phoneNumber: createOrderDto.phoneNumber,
      address: createOrderDto.address,
      status: createOrderDto.status || OrderStatus.PENDING,
      isExternal: createOrderDto.isExternal || false,
      externalTrackingId: createOrderDto.externalTrackingId || null,
      user: user,
    });
    //should call diff provider for each external order
    // Step 3: Save the Order to get an ID

    const savedOrder = await this.orderRepository.save(order);

    // Step 4: Create and link OrderProduct entries

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
        const discountedPrice = product.discount
          ? product.price * (1 - product.discount)
          : product.price;

        if (p.quantity <= 0) {
          throw new NotFoundException(`order cannot have negative quantity`);
        }
        if (p.quantity > product.quantity) {
          throw new NotFoundException(
            `Product with id ${p.productId} not Available`,
          );
        }

        const orderProduct =
          this.orderProductService.createOrderProductProvider({
            order: savedOrder,
            product,
            quantity: p.quantity,
            priceAtPurchase: discountedPrice,
          });

        return orderProduct;
      }),
    );

    // Step 5: Save all OrderProduct entries
    this.orderProductService.saveOrderProduct(orderProducts);

    // Step 6: Return the order with its orderProducts
    savedOrder.orderProducts = orderProducts;
    return savedOrder;
  }
}
