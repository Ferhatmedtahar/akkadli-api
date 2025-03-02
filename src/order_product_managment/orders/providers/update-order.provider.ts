import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { ProductsService } from 'src/order_product_managment/products/providers/products.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GetOrderParamsDto } from '../dtos/getOrderParams.dto';
import { PatchOrderDto } from '../dtos/patchOrder.dto';
import { Order } from '../order.entity';
import { OrderStatus } from '../enums/orderStatus.enum';

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
    if (!order)
      throw new NotFoundException(
        `Order with ID ${getOrderParamsDto.id} not found`,
      );
    if (order.status !== OrderStatus.PENDING)
      throw new BadRequestException('Only pending orders can be updated');

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
    if (patchOrderDto.products.length === 0) {
      const savedOrder = await this.orderRepository.save(order);
      return savedOrder;
    }
    const existingOrderProducts = await this.orderProductService.findByOrderId(
      getOrderParamsDto.id,
    );
    const existingProductIds = existingOrderProducts.map((op) => op.product.id);
    const requestedProductIds = patchOrderDto.products.map((p) => p.productId);

    // Find products to remove
    const productsToRemove = existingOrderProducts.filter(
      (op) => !requestedProductIds.includes(op.product.id),
    );

    // Find products to add or update
    const productsToAddOrUpdate = patchOrderDto.products;

    // Step 3.1: Remove products that are no longer in the request
    for (const op of productsToRemove) {
      await this.orderProductService.removeOrderProduct(op.id);
    }

    // Step 3.2: Add new products or update existing ones
    for (const p of productsToAddOrUpdate) {
      const product = await this.productService.getProductByIdWithRelations({
        id: p.productId,
      });
      if (!product)
        throw new NotFoundException(`Product with ID ${p.productId} not found`);

      const existingOrderProduct = existingOrderProducts.find(
        (op) => op.product.id === p.productId,
      );

      if (existingOrderProduct) {
        // Update quantity if changed
        if (existingOrderProduct.quantity !== p.quantity) {
          existingOrderProduct.quantity = p.quantity;
          await this.orderProductService.updateOrderProductProvider(
            existingOrderProduct,
          );
        }
      } else {
        // Add new order product
        const orderProductToCreate =
          await this.orderProductService.createOrderProductProvider({
            order,
            product,
            quantity: p.quantity,
            priceAtPurchase: product.price, // Use the current price
          });

        await this.orderProductService.saveOrderProduct([orderProductToCreate]);
      }
    }
    return { message: 'Order updated successfully', order };
  }
}

// import {
//   BadRequestException,
//   Body,
//   Injectable,
//   NotFoundException,
//   Param,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
// import { ProductsService } from 'src/order_product_managment/products/providers/products.service';
// import { UsersService } from 'src/users/providers/users.service';
// import { Repository } from 'typeorm';
// import { GetOrderParamsDto } from '../dtos/getOrderParams.dto';
// import { PatchOrderDto } from '../dtos/patchOrder.dto';
// import { Order } from '../order.entity';

// @Injectable()
// export class UpdateOrderProvider {
//   constructor(
//     /**inject order repository */
//     @InjectRepository(Order)
//     private orderRepository: Repository<Order>,
//     /**inject product service */
//     private readonly productService: ProductsService,
//     /**inject order product service */
//     private readonly orderProductService: OrderProductService,

//     /**inject user service */
//     private readonly usersService: UsersService,
//   ) {}
//   public async updateOrder(
//     @Param() getOrderParamsDto: GetOrderParamsDto,
//     @Body() patchOrderDto: PatchOrderDto,
//   ) {
//     // Step 1 : Get the user , order and orderProducts
//     const user = await this.usersService.findUserById(19);
//     const order = await this.orderRepository.findOne({
//       where: { id: getOrderParamsDto.id, user: { id: user.id } },
//       relations: {
//         orderProducts: true,
//       },
//     });
//     if (!order)
//       throw new NotFoundException(
//         `Order with ID ${getOrderParamsDto.id} not found`,
//       );
//     if (order.status !== 'pending')
//       throw new BadRequestException('Only pending orders can be updated');

//     // Step 2: update the Order entity
//     order.customerName = patchOrderDto.customerName ?? order.customerName;
//     order.phoneNumber = patchOrderDto.phoneNumber ?? order.phoneNumber;
//     order.address = patchOrderDto.address ?? order.address;
//     order.status = patchOrderDto.status ?? order.status;
//     order.isExternal = patchOrderDto.isExternal ?? order.isExternal;
//     order.externalTrackingId =
//       patchOrderDto.externalTrackingId ?? order.externalTrackingId;

//     //should call diff provider for each external order
//     // Step 3: save the order after changes

//     const savedOrder = await this.orderRepository.save(order);

//     // Step 4: Create and link OrderProduct entries

//     const orderProducts = await Promise.all(
//       patchOrderDto.products.map(async (p) => {
//         const product = await this.productService.getProductByIdWithRelations({
//           id: p.productId,
//         });

//         if (!product) {
//           throw new NotFoundException(
//             `Product with id ${p.productId} not found`,
//           );
//         }
//         return this.orderProductService.createOrderProductProvider({
//           order: savedOrder,
//           product,
//           quantity: p.quantity,
//           priceAtPurchase: p.quantity,
//         });
//         // const orderProduct =
//         //   this.orderProductService.updateOrderProductProvider({
//         //     order: savedOrder,
//         //     product,

//         //     quantity: p.quantity,
//         //   });

//         // return orderProduct;
//       }),
//     );

//     // Step 5: Save all OrderProduct entries
//     this.orderProductService.saveOrderProduct(orderProducts);

//     // Step 6: Return the order with its orderProducts
//     savedOrder.orderProducts = orderProducts;
//     return savedOrder;
//   }
// }
