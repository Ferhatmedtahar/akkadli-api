import {
  BadRequestException,
  Body,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { Product } from 'src/order_product_managment/products/product.entity';
import { ProductsService } from 'src/order_product_managment/products/providers/products.service';
import { UsersService } from 'src/users/providers/users.service';
import { User } from 'src/users/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto } from '../dtos/createOrder.dto';
import { OrderStatus } from '../enums/orderStatus.enum';
import { Order } from '../order.entity';

@Injectable()
export class CreateOrderProvider {
  private readonly logger = new Logger(CreateOrderProvider.name);

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly productService: ProductsService,
    private readonly orderProductService: OrderProductService,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  public async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    if (createOrderDto.products.length <= 0) {
      throw new BadRequestException('Order cannot be empty');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Step 1: Get the user
      let user: User;
      try {
        user = await queryRunner.manager.findOne(User, { where: { id: 19 } });
        this.logger.log('User fetched successfully for order creation:', {
          userId: 19,
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
        this.logger.warn('User not found for ID 19');
        throw new NotFoundException('User not found', {
          description: 'User does not exist in the database',
        });
      }

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

      // Step 3: Save the Order to get an ID
      const savedOrder = await queryRunner.manager.save(order);
      this.logger.log('Order created successfully:', {
        orderId: savedOrder.id,
      });

      // Step 4: Create and link OrderProduct entries, update Products
      const orderProducts = [];
      for (const p of createOrderDto.products) {
        if (p.quantity == null || p.quantity === undefined || p.quantity <= 0) {
          this.logger.warn('Invalid or missing quantity for product:', {
            productId: p.productId,
            quantity: p.quantity,
          });
          throw new BadRequestException(
            `Invalid or missing quantity for product ${p.productId}`,
          );
        }

        let product: Product;
        try {
          product = await queryRunner.manager.findOne(Product, {
            where: { id: p.productId },
          });
          this.logger.log('Product fetched for order:', {
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
            `Product with id ${p.productId} not found`,
            {
              description: 'Product does not exist in the database',
            },
          );
        }

        const discountedPrice = product.discount
          ? product.price * (1 - product.discount)
          : product.price;

        if (p.quantity > product.quantity) {
          this.logger.warn('Insufficient stock for product:', {
            productId: p.productId,
            requested: p.quantity,
            available: product.quantity,
          });
          throw new BadRequestException(
            `Product with id ${p.productId} not available (only ${product.quantity} in stock)`,
            {
              description: 'Insufficient stock for the requested quantity',
            },
          );
        }

        // Update Product: reduce quantity, increase totalProductsSold
        product.quantity -= p.quantity;
        product.totalProductsSold += p.quantity;
        try {
          await this.productService.updateProductFromOrder(
            product,
            queryRunner.manager,
          );
          this.logger.log('Product updated successfully for order:', {
            productId: product.id,
          });
        } catch (error) {
          this.logger.error(
            'Failed to update product: Database error',
            error.stack || error.message || 'No stack trace available',
          );
          throw new InternalServerErrorException(
            'Could not update product during order creation',
            { description: 'Error updating product inventory in the database' },
          );
        }

        const orderProduct =
          await this.orderProductService.createOrderProductProvider({
            order: savedOrder,
            product,
            quantity: p.quantity, // Explicitly ensure this is set
            priceAtPurchase: discountedPrice,
          });

        this.logger.log('OrderProduct created:', {
          orderId: orderProduct.order.id,
          productId: orderProduct.product.id,
          quantity: orderProduct.quantity,
          priceAtPurchase: orderProduct.priceAtPurchase,
        });

        orderProducts.push(orderProduct);
      }

      // Step 5: Save all OrderProduct entries
      this.logger.log(
        'OrderProducts before save:',
        orderProducts.map((p) => ({
          orderId: p.order.id,
          productId: p.product.id,
          quantity: p.quantity,
          priceAtPurchase: p.priceAtPurchase,
        })),
      );

      try {
        const savedOrderProducts =
          await this.orderProductService.saveOrderProduct(
            orderProducts,
            queryRunner.manager,
          );
        savedOrder.orderProducts = savedOrderProducts; // Update with saved entities
        this.logger.log('OrderProducts saved successfully:', {
          count: savedOrderProducts.length,
        });
      } catch (error) {
        this.logger.error('Failed to save OrderProducts: Database error', {
          error: error.message,
          stack: error.stack || 'No stack trace available',
          orderId: savedOrder.id,
          orderProducts: orderProducts.map((p) => ({
            productId: p.product.id,
            quantity: p.quantity,
            priceAtPurchase: p.priceAtPurchase,
          })),
        });
        throw new InternalServerErrorException(
          'Failed to save order products, please try again later',
          { description: 'Error saving order products to the database' },
        );
      }

      // Step 6: Commit the transaction
      await queryRunner.commitTransaction();
      this.logger.log('Transaction committed successfully for order:', {
        orderId: savedOrder.id,
      });

      // Step 7: Return the order with its orderProducts
      return savedOrder;
    } catch (error) {
      // Step 8: Roll back the transaction on error
      this.logger.error(
        'Transaction failed for order creation, rolling back',
        error.stack || error.message || 'No stack trace available',
      );
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Step 9: Release the query runner
      await queryRunner.release();
      this.logger.log('Query runner released');
    }
  }
}
