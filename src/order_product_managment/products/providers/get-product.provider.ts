import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GetProductParamsDto } from '../dtos/getProductParams.dto';
import { GetProductsDto } from '../dtos/getProducts.dto';
import { Product } from '../product.entity';

@Injectable()
export class GetProductProvider {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject products repository */
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    /**pagination service */
    private readonly paginationService: PaginationService,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}

  public async getProductById(
    getProductParamsDto: GetProductParamsDto,
    userId: number,
  ) {
    // get the user id from the request and Find the user

    let user = undefined;
    let product = undefined;
    try {
      user = await this.usersService.findUserById(userId);
    } catch (error) {
      this.logger.error(
        'Failed to fetch user: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }

    if (!user) {
      this.logger.warn(`User not found for ID ${userId}`);
      throw new NotFoundException('User not found', {
        description: 'user not found in the database',
      });
    }

    // Find the product and ensure it belongs to the user
    try {
      product = await this.productsRepository.findOne({
        where: { id: getProductParamsDto.id, user: { id: userId } },
      });
    } catch (error) {
      this.logger.error(
        'Failed to fetch product: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }

    if (!product) {
      this.logger.warn(`Product not found for ID ${getProductParamsDto.id}`);
      throw new BadRequestException('product not found', {
        description: 'product not found with the provided id or does not exist',
      });
    }
    this.logger.log(`Product found for ID ${product.id}`);
    return product;
  }
  public async findAll(
    productsQuery: GetProductsDto,
    userId: number,
  ): Promise<Paginated<Product>> {
    let user = undefined;
    let products = undefined;
    try {
      user = await this.usersService.findUserById(userId);
    } catch (error) {
      this.logger.error(
        'Failed to fetch user: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }

    if (!user) {
      this.logger.log(`User not found for ID ${userId}`);
      throw new NotFoundException('User not found');
    }

    // return the products of that user
    try {
      const where = { user: { id: user.id } };
      products = await this.paginationService.paginateQuery(
        productsQuery,
        this.productsRepository,
        where,
      );
      console.log(products);
    } catch (e) {
      this.logger.error(
        'Failed to fetch products: Database connection error',
        e.stack || e.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }

    this.logger.log(`Found ${products.data.length} products`);
    return products;
  }

  public async getProductByIdWithRelations(
    getProductParamsDto: GetProductParamsDto,
    userId: number,
  ) {
    let user = undefined;
    let product = undefined;
    try {
      user = await this.usersService.findUserById(userId);
    } catch (error) {
      this.logger.error(
        'Failed to fetch user: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
        },
      );
    }

    if (!user) {
      this.logger.warn(`User not found for ID ${userId}`);
      throw new NotFoundException('User not found');
    }

    // Find the product and ensure it belongs to the user
    try {
      product = await this.productsRepository.findOne({
        where: { id: getProductParamsDto.id, user: { id: userId } },
        relations: { orderProducts: true },
      });
    } catch (error) {
      this.logger.error(
        'Failed to fetch product: Database connection error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!product) {
      throw new BadRequestException('product not found or does not exist');
    }
    this.logger.log(`Product found for ID ${product.id} for relation`);
    return product;
  }
}
