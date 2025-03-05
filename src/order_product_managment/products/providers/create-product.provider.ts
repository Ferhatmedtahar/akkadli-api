import {
  BadRequestException,
  Body,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/createProduct.dto';
import { Product } from '../product.entity';

@Injectable()
export class CreateProductProvider {
  private readonly logger = new Logger(CreateProductProvider.name);

  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject products repository */
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  public async createProductProvider(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    let user: any; // Adjust type based on your User entity
    let product: Product;

    // 1. Find user from database based on the author ID
    try {
      user = await this.usersService.findUserById(19);
      this.logger.log('User fetched successfully for product creation:', {
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

    // 2. Validate input
    if (createProductDto.quantity <= 0) {
      this.logger.warn('Invalid quantity for product:', {
        quantity: createProductDto.quantity,
      });
      throw new BadRequestException('Quantity must be greater than 0');
    }
    if (createProductDto.price <= 0) {
      this.logger.warn('Invalid price for product:', {
        price: createProductDto.price,
      });
      throw new BadRequestException('Price must be greater than 0');
    }
    if (createProductDto.discount < 0 || createProductDto.discount > 1) {
      this.logger.warn('Invalid discount for product:', {
        discount: createProductDto.discount,
      });
      throw new BadRequestException('Discount must be between 0 and 1');
    }

    this.logger.log('Creating product with DTO:', createProductDto);

    // 3. Create and save product
    try {
      product = this.productsRepository.create({
        ...createProductDto,
        inStock: createProductDto.quantity > 0,
        totalProductsSold: 0,
        user: user,
      });

      product = await this.productsRepository.save(product);
      this.logger.log('Product created successfully:', {
        productId: product.id,
      });
    } catch (error) {
      this.logger.error('Failed to create product: Database error', {
        error: error.message,
        stack: error.stack || 'No stack trace available',
        productDto: createProductDto,
      });
      if (error instanceof Error && 'constraint' in error) {
        throw new BadRequestException(
          `Database constraint violation: ${error.message}`,
          {
            description:
              'Check product data for uniqueness or foreign key issues',
          },
        );
      }
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        { description: 'Error creating product in the database' },
      );
    }

    if (!product) {
      this.logger.warn('Product creation failed unexpectedly');
      throw new BadRequestException('Product not created', {
        description: 'Unexpected error creating product',
      });
    }

    return product;
  }
}
