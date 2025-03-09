import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { Product } from 'src/order_product_managment/products/product.entity';
import { ProductsService } from 'src/order_product_managment/products/providers/products.service';
import { User } from 'src/users/user.entity';
import { DataSource, Repository } from 'typeorm';
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
    /**inject data source */
    private readonly dataSource: DataSource,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}

  public async createOrder(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<Order> {
    if (createOrderDto.products.length <= 0) {
      throw new BadRequestException('Order cannot be empty');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let user: User;
      try {
        user = await queryRunner.manager.findOne(User, {
          where: { id: userId },
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

      const order = this.orderRepository.create({
        customerName: createOrderDto.customerName,
        phoneNumber: createOrderDto.phoneNumber,
        address: createOrderDto.address,
        status: createOrderDto.status || OrderStatus.PENDING,
        isExternal: createOrderDto.isExternal || false,
        externalTrackingId: createOrderDto.externalTrackingId || null,
        user: user,
      });

      const savedOrder = await queryRunner.manager.save(order);
      this.logger.log(`Order created successfully with ID ${savedOrder.id}`);

      const orderProducts = [];
      for (const p of createOrderDto.products) {
        if (p.quantity == null || p.quantity === undefined || p.quantity <= 0) {
          this.logger.warn(
            `Invalid or missing quantity for product ${p.productId}`,
          );
          throw new BadRequestException(
            `Invalid or missing quantity for product ${p.productId}`,
          );
        }

        let product: Product;
        try {
          product = await queryRunner.manager.findOne(Product, {
            where: { id: p.productId, user: { id: user.id } },
          });
          this.logger.log(`Product ${p.productId}fetched for order creation`);
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
          this.logger.warn(`Product ${p.productId}not found`);
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
          this.logger.warn(
            `Insufficient stock for product ${p.productId}, requested: ${p.quantity}, available: ${product.quantity}`,
          );

          throw new BadRequestException(
            `Product with id ${p.productId} not available (only ${product.quantity} in stock)`,
            {
              description: 'Insufficient stock for the requested quantity',
            },
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
            `Product ${product.id} updated successfully for order`,
          );
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
          this.orderProductService.createOrderProductProvider({
            order: savedOrder,
            product,
            quantity: p.quantity,
            priceAtPurchase: discountedPrice,
          });

        this.logger
          .log(`OrderProduct created successfully for order ${orderProduct.order.id}
            product ${orderProduct.product.id} with quantity ${orderProduct.quantity} and price ${orderProduct.priceAtPurchase}`);

        orderProducts.push(orderProduct);
      }

      try {
        const savedOrderProducts =
          await this.orderProductService.saveOrderProduct(
            orderProducts,
            queryRunner.manager,
          );
        savedOrder.orderProducts = savedOrderProducts; // Update with saved entities
        this.logger
          .log(`OrderProducts saved successfully for order ${savedOrder.id}
          savedOrderProducts.length: ${savedOrderProducts.length}`);
      } catch (error) {
        this.logger.error(
          'Failed to save order products: Database error',
          error.stack || error.message || 'No stack trace available',
        );
        throw new InternalServerErrorException(
          'Failed to save order products, please try again later',
          { description: 'Error saving order products to the database' },
        );
      }

      await queryRunner.commitTransaction();
      this.logger.log(
        `Transaction committed successfully for order ${savedOrder.id}`,
      );

      return savedOrder;
    } catch (error) {
      this.logger.error(
        'Transaction failed for order creation, rolling back',
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
