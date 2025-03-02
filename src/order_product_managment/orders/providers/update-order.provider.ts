import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { ProductsService } from 'src/order_product_managment/products/providers/products.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GetOrderParamsDto } from '../dtos/getOrderParams.dto';
import { PatchOrderDto } from '../dtos/patchOrder.dto';
import { Order } from '../order.entity';

@Injectable()
export class UpdateOrderProvider {
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
  public async updateOrder(
    @Param() getOrderParamsDto: GetOrderParamsDto,
    @Body() patchOrderDto: PatchOrderDto,
  ) {
    // Step 1 : Get the user , order and orderProducts
    const user = await this.usersService.findUserById(19);
    const order = await this.orderRepository.findOne({
      where: { id: getOrderParamsDto.id, user: { id: user.id } },
      relations: {
        orderProducts: true,
      },
    });

    // Step 2: update the Order entity
    order.customerName = patchOrderDto.customerName ?? order.customerName;
    order.phoneNumber = patchOrderDto.phoneNumber ?? order.phoneNumber;
    order.address = patchOrderDto.address ?? order.address;
    order.status = patchOrderDto.status ?? order.status;
    order.isExternal = patchOrderDto.isExternal ?? order.isExternal;
    order.externalTrackingId =
      patchOrderDto.externalTrackingId ?? order.externalTrackingId;

    //should call diff provider for each external order
    // Step 3: save the order after changes

    const savedOrder = await this.orderRepository.save(order);

    // Step 4: Create and link OrderProduct entries

    const orderProducts = await Promise.all(
      patchOrderDto.products.map(async (p) => {
        const product = await this.productService.getProductByIdWithRelations({
          id: p.productId,
        });

        if (!product) {
          throw new NotFoundException(
            `Product with id ${p.productId} not found`,
          );
        }
        return this.orderProductService.createOrderProductProvider({
          order: savedOrder,
          product,
          quantity: p.quantity,
          priceAtPurchase: p.quantity,
        });
        // const orderProduct =
        //   this.orderProductService.updateOrderProductProvider({
        //     order: savedOrder,
        //     product,

        //     quantity: p.quantity,
        //   });

        // return orderProduct;
      }),
    );

    // Step 5: Save all OrderProduct entries
    this.orderProductService.saveOrderProduct(orderProducts);

    // Step 6: Return the order with its orderProducts
    savedOrder.orderProducts = orderProducts;
    return savedOrder;
  }
}
