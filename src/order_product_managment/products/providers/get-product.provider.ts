import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GetProductParamsDto } from '../dtos/getProductParams.dto';
import { GetProductsDto } from '../dtos/getProducts.dto';
import { Product } from '../product.entity';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

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
  ) {}

  public async getProductById(getProductParamsDto: GetProductParamsDto) {
    // get the user id from the request and Find the user
    const userId = 19;
    let user = undefined;
    let product = undefined;
    try {
      user = await this.usersService.findUserById(userId);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!user) {
      throw new NotFoundException('User not found', {
        description: 'user not found in the database',
      });
    }

    // Find the product and ensure it belongs to the user
    try {
      product = await this.productsRepository.findOne({
        where: { id: getProductParamsDto.id, user: { id: userId } },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!product) {
      throw new BadRequestException('product not found', {
        description: 'product not found with the provided id or does not exist',
      });
    }

    return product;
  }
  public async findAll(
    productsQuery: GetProductsDto,
  ): Promise<Paginated<Product>> {
    //find a user and check if it exist in db
    //TODO later change the user to the current user on the requuest
    let user = undefined;
    let products = undefined;
    try {
      user = await this.usersService.findUserById(19);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!user) {
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
    } catch (e) {
      console.log(e);
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    return products;
  }

  public async getProductByIdWithRelations(
    getProductParamsDto: GetProductParamsDto,
  ) {
    // get the user id from the request and Find the user
    const userId = 19;
    let user = undefined;
    let product = undefined;
    try {
      user = await this.usersService.findUserById(userId);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Find the product and ensure it belongs to the user
    try {
      product = await this.productsRepository.findOne({
        where: { id: getProductParamsDto.id, user: { id: userId } },
        relations: { orderProducts: true },
      });
    } catch {
      throw new RequestTimeoutException(
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

    return product;
  }
}
