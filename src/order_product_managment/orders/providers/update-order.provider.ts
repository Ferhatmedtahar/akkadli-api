import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from 'src/order_product_managment/order-product/order-product.entity';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { Product } from 'src/order_product_managment/products/product.entity';
import { ProductsService } from 'src/order_product_managment/products/providers/products.service';
import { User } from 'src/users/user.entity';
import { DataSource, Repository } from 'typeorm';
import { GetOrderParamsDto } from '../dtos/getOrderParams.dto';
import { PatchOrderDto } from '../dtos/patchOrder.dto';
import { OrderStatus } from '../enums/orderStatus.enum';
import { Order } from '../order.entity';

@Injectable()
export class UpdateOrderProvider {
  private readonly logger = new Logger(UpdateOrderProvider.name);

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly productService: ProductsService,
    private readonly orderProductService: OrderProductService,
    private readonly dataSource: DataSource, // Inject DataSource for transactions
  ) {}

  public async updateOrder(
    getOrderParamsDto: GetOrderParamsDto,
    patchOrderDto: PatchOrderDto,
    userId: number,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let user: User;
      try {
        user = await queryRunner.manager.findOne(User, {
          where: { id: userId },
        });
        this.logger.log('User fetched successfully for order update:', {
          userId: userId,
        });
      } catch (error) {
        this.logger.error(
          'Failed to fetch user: Database connection error',
          error.stack || error.message || 'No stack trace available',
        );
        throw new InternalServerErrorException(
          'Database connection failed, please try again later',
          { description: 'Error fetching user from the database' },
        );
      }

      if (!user) {
        this.logger.warn(`User not found for ID ${userId}`);
        throw new NotFoundException('User not found', {
          description: 'User does not exist in the database',
        });
      }

      let order: Order;
      try {
        order = await queryRunner.manager.findOne(Order, {
          where: { id: getOrderParamsDto.id, user: { id: user.id } },
          relations: { orderProducts: true },
        });
        this.logger.log('Order fetched successfully for update:', {
          orderId: getOrderParamsDto.id,
        });
      } catch (error) {
        this.logger.error(
          'Failed to fetch order: Database error',
          error.stack || error.message || 'No stack trace available',
        );
        throw new InternalServerErrorException(
          'Failed to retrieve order, please try again later',
          { description: 'Error querying the database for order' },
        );
      }

      if (!order) {
        this.logger.warn('Order not found or not owned by user:', {
          orderId: getOrderParamsDto.id,
          userId: user.id,
        });
        throw new NotFoundException(
          `Order with ID ${getOrderParamsDto.id} not found`,
          {
            description: 'Order does not exist or does not belong to the user',
          },
        );
      }

      if (order.status !== OrderStatus.PENDING) {
        this.logger.warn('Order status prevents update:', {
          orderId: getOrderParamsDto.id,
          status: order.status,
        });
        throw new BadRequestException('Only pending orders can be updated');
      }

      // Step 3: Update the Order entity
      order.customerName = patchOrderDto.customerName ?? order.customerName;
      order.phoneNumber = patchOrderDto.phoneNumber ?? order.phoneNumber;
      order.address = patchOrderDto.address ?? order.address;
      order.status = patchOrderDto.status ?? order.status;
      order.isExternal = patchOrderDto.isExternal ?? order.isExternal;
      order.externalTrackingId =
        patchOrderDto.externalTrackingId ?? order.externalTrackingId;

      // Step 4: Handle product updates if provided
      if (patchOrderDto.products && patchOrderDto.products.length > 0) {
        let existingOrderProducts: OrderProduct[];
        try {
          existingOrderProducts = await queryRunner.manager.find(OrderProduct, {
            where: { order: { id: getOrderParamsDto.id } },
            relations: ['product'], // Ensure product relation is loaded
          });
          this.logger.log('Existing OrderProducts fetched:', {
            count: existingOrderProducts.length,
          });
        } catch (error) {
          this.logger.error(
            'Failed to fetch existing OrderProducts: Database error',
            error.stack || error.message || 'No stack trace available',
          );
          throw new InternalServerErrorException(
            'Failed to retrieve existing order products, please try again later',
            { description: 'Error querying existing order products' },
          );
        }

        const existingProductIds = existingOrderProducts.map(
          (op) => op.product.id,
        );
        const requestedProductIds = patchOrderDto.products.map(
          (p) => p.productId,
        );

        // Find products to remove
        const productsToRemove = existingOrderProducts.filter(
          (op) => !requestedProductIds.includes(op.product.id),
        );

        // Find products to add or update
        const productsToAddOrUpdate = patchOrderDto.products;

        // Step 4.1: Remove products and revert Product quantities
        for (const op of productsToRemove) {
          const product = op.product; // Already loaded via relations
          if (!product) {
            throw new NotFoundException(
              `Product with ID ${op.product.id} not found`,
            );
          }
          product.quantity += op.quantity; // Return stock
          product.totalProductsSold -= op.quantity; // Reduce sold count
          try {
            await this.productService.updateProductFromOrder(
              product,
              userId,
              queryRunner.manager,
            );
            this.logger.log('Product quantity reverted successfully:', {
              productId: product.id,
            });
          } catch (error) {
            this.logger.error(
              'Failed to revert product quantity: Database error',
              error.stack || error.message || 'No stack trace available',
            );
            throw new InternalServerErrorException(
              'Could not revert product quantity during order update',
              { description: 'Error updating product inventory' },
            );
          }

          try {
            await queryRunner.manager.remove(op);
            this.logger.log('OrderProduct removed successfully:', {
              orderProductId: op.id,
            });
          } catch (error) {
            this.logger.error(
              'Failed to remove OrderProduct: Database error',
              error.stack || error.message || 'No stack trace available',
            );
            throw new InternalServerErrorException(
              'Failed to remove order product, please try again later',
              { description: 'Error removing order product' },
            );
          }
        }

        // Step 4.2: Add new products or update existing ones
        for (const p of productsToAddOrUpdate) {
          let product: Product;
          try {
            product = await queryRunner.manager.findOne(Product, {
              where: { id: p.productId },
            });
            this.logger.log('Product fetched for order update:', {
              productId: p.productId,
            });
          } catch (error) {
            this.logger.error(
              'Failed to fetch product: Database error',
              error.stack || error.message || 'No stack trace available',
            );
            throw new InternalServerErrorException(
              'Failed to retrieve product, please try again later',
              { description: 'Error querying the database for product' },
            );
          }

          if (!product) {
            this.logger.warn('Product not found:', { productId: p.productId });
            throw new NotFoundException(
              `Product with ID ${p.productId} not found`,
              {
                description: 'Product does not exist in the database',
              },
            );
          }

          const existingOrderProduct = existingOrderProducts.find(
            (op) => op.product.id === p.productId,
          );

          if (existingOrderProduct) {
            // Update existing OrderProduct
            const quantityDiff = p.quantity - existingOrderProduct.quantity;
            this.logger.log('Updating existing OrderProduct:', {
              orderProductId: existingOrderProduct.id,
              currentQuantity: existingOrderProduct.quantity,
              newQuantity: p.quantity,
              quantityDiff: quantityDiff,
              productId: p.productId,
            });

            if (quantityDiff !== 0) {
              if (quantityDiff > 0) {
                // Increasing quantity
                if (quantityDiff > product.quantity) {
                  this.logger.warn('Insufficient stock for product update:', {
                    productId: p.productId,
                    requested: quantityDiff,
                    available: product.quantity,
                  });
                  throw new BadRequestException(
                    `Insufficient stock for product ${p.productId} (${product.quantity} available)`,
                  );
                }
              } else {
                // Decreasing quantity (quantityDiff < 0)
                if (product.quantity + quantityDiff < 0) {
                  throw new BadRequestException(
                    `Cannot decrease quantity below 0 for product ${p.productId}`,
                  );
                }
              }
              this.logger.log('Product before update:', {
                productId: product.id,
                quantity: product.quantity,
                totalProductsSold: product.totalProductsSold,
              });
              product.quantity -= quantityDiff; // Adjust stock (positive or negative diff)
              product.totalProductsSold += quantityDiff; // Adjust sold count
              const discountedPrice = product.discount
                ? product.price * (1 - product.discount)
                : product.price;
              try {
                await this.productService.updateProductFromOrder(
                  product,
                  userId,
                  queryRunner.manager,
                );
                this.logger.log('Product quantity updated successfully:', {
                  productId: product.id,
                  quantity: product.quantity,
                  totalProductsSold: product.totalProductsSold,
                });
              } catch (error) {
                this.logger.error(
                  'Failed to update product quantity: Database error',
                  error.stack || error.message || 'No stack trace available',
                );
                throw new InternalServerErrorException(
                  'Could not update product quantity during order update',
                  { description: 'Error updating product inventory' },
                );
              }

              existingOrderProduct.quantity = p.quantity;
              existingOrderProduct.priceAtPurchase = discountedPrice; // Recalculate priceAtPurchase
              this.logger.log('OrderProduct before save:', {
                orderProductId: existingOrderProduct.id,
                quantity: existingOrderProduct.quantity,
                priceAtPurchase: existingOrderProduct.priceAtPurchase,
              });
              try {
                const updatedOrderProduct = await queryRunner.manager.merge(
                  OrderProduct,
                  existingOrderProduct,
                  {
                    quantity: p.quantity,
                    priceAtPurchase: discountedPrice,
                  },
                );
                const savedOrderProduct =
                  await queryRunner.manager.save(updatedOrderProduct);
                this.logger.log('OrderProduct updated successfully:', {
                  orderProductId: savedOrderProduct.id,
                  quantity: savedOrderProduct.quantity,
                  priceAtPurchase: savedOrderProduct.priceAtPurchase,
                });
              } catch (error) {
                this.logger.error(
                  'Failed to update OrderProduct: Database error',
                  error.stack || error.message || 'No stack trace available',
                );
                throw new InternalServerErrorException(
                  'Failed to update order product, please try again later',
                  { description: 'Error updating order product' },
                );
              }

              // Reload order to ensure orderProducts reflect the update
              try {
                order = await queryRunner.manager.findOne(Order, {
                  where: { id: getOrderParamsDto.id },
                  relations: { orderProducts: true },
                });
                this.logger.log('Order reloaded with updated orderProducts:', {
                  orderId: order.id,
                  orderProducts: order.orderProducts.map((op) => ({
                    id: op.id,
                    quantity: op.quantity,
                    priceAtPurchase: op.priceAtPurchase,
                  })),
                });
              } catch (error) {
                this.logger.error(
                  'Failed to reload order: Database error',
                  error.stack || error.message || 'No stack trace available',
                );
                throw new InternalServerErrorException(
                  'Failed to reload order, please try again later',
                  {
                    description:
                      'Error reloading order with updated orderProducts',
                  },
                );
              }
            }
          } else {
            // Add new OrderProduct
            if (p.quantity > product.quantity) {
              this.logger.warn('Insufficient stock for new product:', {
                productId: p.productId,
                requested: p.quantity,
                available: product.quantity,
              });
              throw new BadRequestException(
                `Insufficient stock for product ${p.productId} (${product.quantity} available)`,
              );
            }
            product.quantity -= p.quantity;
            product.totalProductsSold += p.quantity;
            try {
              await this.productService.updateProductFromOrder(
                product,
                userId,
                queryRunner.manager,
              );
              this.logger.log(
                'Product quantity reduced for new OrderProduct:',
                { productId: product.id },
              );
            } catch (error) {
              this.logger.error(
                'Failed to reduce product quantity: Database error',
                error.stack || error.message || 'No stack trace available',
              );
              throw new InternalServerErrorException(
                'Could not reduce product quantity during order update',
                { description: 'Error updating product inventory' },
              );
            }

            const orderProductToCreate =
              this.orderProductService.createOrderProductProvider({
                order,
                product,
                quantity: p.quantity,
                priceAtPurchase: product.price, // Use the current price
              });
            try {
              await queryRunner.manager.save(orderProductToCreate);
              this.logger.log('New OrderProduct created successfully:', {
                orderProductId: orderProductToCreate.id,
              });
            } catch (error) {
              this.logger.error(
                'Failed to create new OrderProduct: Database error',
                error.stack || error.message || 'No stack trace available',
              );
              throw new InternalServerErrorException(
                'Failed to create new order product, please try again later',
                { description: 'Error creating order product' },
              );
            }
          }
        }
      }

      // Step 5: Save the updated order
      try {
        const savedOrder = await queryRunner.manager.save(order);
        this.logger.log('Order updated successfully:', {
          orderId: savedOrder.id,
        });
        await queryRunner.commitTransaction();
        return { message: 'Order updated successfully', order: savedOrder };
      } catch (error) {
        this.logger.error(
          'Failed to save updated order: Database error',
          error.stack || error.message || 'No stack trace available',
        );
        throw new InternalServerErrorException(
          'Failed to save updated order, please try again later',
          { description: 'Error saving updated order to the database' },
        );
      }
    } catch (error) {
      this.logger.error(
        'Transaction failed for order update, rolling back',
        error.stack || error.message || 'No stack trace available',
      );
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      this.logger.log('Query runner released');
    }
  }
}
