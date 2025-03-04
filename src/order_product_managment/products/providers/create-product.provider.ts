import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
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
  ) {}

  public async createProductProvider(
    @Body() createProductDto: CreateProductDto,
  ) {
    let product = undefined;
    let user = undefined;
    //1 find user from database based on the autor id
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
      throw new BadRequestException('user not found.', {
        description: 'error finding user with the provided id',
      });
    }

    if (createProductDto.quantity <= 0) {
      throw new BadRequestException('quantity must be greater than 0');
    }
    if (createProductDto.price <= 0) {
      throw new BadRequestException('price must be greater than 0');
    }
    if (createProductDto.discount < 0 || createProductDto.discount > 1) {
      throw new BadRequestException('discount must be between 0 and 1');
    }

    //2 create product
    try {
      product = this.productsRepository.create({
        ...createProductDto,
        inStock: createProductDto.quantity > 0 ? true : false,
        totalProductsSold: 0,
        user: user,
      });
      product = await this.productsRepository.save(product);
      return product;
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
  }
}
