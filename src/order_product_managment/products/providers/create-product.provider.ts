import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { UsersService } from 'src/users/providers/users.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/createProduct.dto';
import { Product } from '../product.entity';

@Injectable()
export class CreateProductProvider {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject products repository */
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}

  public async createProductProvider(
    createProductDto: CreateProductDto,
    userId: number,
  ): Promise<Product> {
    let user: User;
    let product: Product;

    // 1. Find user from database based on the author ID
    try {
      user = await this.usersService.findUserById(userId);
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

    // 2. Validate input
    if (createProductDto.quantity <= 0) {
      this.logger.warn(
        `Invalid quantity : ${createProductDto.quantity} for a product `,
      );
      throw new BadRequestException('Quantity must be greater than 0');
    }
    if (createProductDto.price <= 0) {
      this.logger.warn(`Invalid price ${createProductDto.price}for a product`);
      throw new BadRequestException('Price must be greater than 0');
    }
    if (createProductDto.discount < 0 || createProductDto.discount > 1) {
      this.logger.warn(
        `Invalid discount ${createProductDto.discount}for a product`,
      );
      throw new BadRequestException('Discount must be between 0 and 1');
    }

    // 3. Create and save product
    try {
      product = this.productsRepository.create({
        ...createProductDto,
        inStock: createProductDto.quantity > 0,
        totalProductsSold: 0,
        user: user,
      });

      product = await this.productsRepository.save(product);
      this.logger.log(`Product created successfully`);
    } catch (error) {
      this.logger.error(
        'Failed to create product: Database error',
        error.stack || error.message || 'No stack trace available',
      );
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
