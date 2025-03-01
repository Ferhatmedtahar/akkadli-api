import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order_product_managment/order-product/providers/order-product.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/createProduct.dto';
import { GetProductParamsDto } from '../dtos/getProductParams.dto';
import { PatchProductDto } from '../dtos/patchProduct.dto';
import { Product } from '../product.entity';
import { UpdateProductProvider } from './update-product.provider';

@Injectable()
export class CreateProductProvider {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject products repository */
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    /**inject order product service */
    private readonly orderProductService: OrderProductService,
    /**inject update product provider */
    private readonly updateProductProvider: UpdateProductProvider,
  ) {}

  public async createProduct(@Body() createProductDto: CreateProductDto) {
    //1 find user from database based on the autor id
    const user = await this.usersService.findUserById(19);
    if (!user) {
      return { message: 'user not found', error: true };
    }
    //2 create product
    const product = this.productsRepository.create({
      ...createProductDto,
      inStock: createProductDto.quantity > 0 ? true : false,
      user: user,
    });

    return await this.productsRepository.save(product);
  }
}
