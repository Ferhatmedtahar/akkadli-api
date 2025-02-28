import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/createProduct.dto';
import { GetProductParamsDto } from '../dtos/getProductParams.dto';
import { Product } from '../product.entity';

@Injectable()
export class ProductsService {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject products repository */
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  findAll() {
    //find a user and check if it exist in db
    //TODO later change the user to the current user on the requuest
    const user = this.usersService.findUserById(1);

    if (!user) {
      return {
        message: 'user not found',
        error: true,
      };
    }

    return {
      id: 1,
      productName: 'product 1',
      description: 'product 1 description',
      color: 'red',
      size: 'small',
      heavyWeight: false,
      price: 10,
      discount: 0,
    };
    // return the products of that user
  }
  createProduct(@Body() createProductDto: CreateProductDto) {
    //1 find user from database based on the autor id
    //2 find tags from database based on the tag ids
    //3 create product and return it
  }
  public updateProduct() {
    //1 find the tags from database based on the tag ids , check if the number of found tags == number of tags was asked about
    //2 find the product from database based on the product id
    //3 update the properties
    //4 return the product
  }

  public deleteProduct() {
    //1 find the product from database based on the product id
    //2 delete the product
  }

  public async getProductById(getProductParamsDto: GetProductParamsDto) {
    return await this.productsRepository.findOne({
      where: { id: getProductParamsDto.id },
    });
  }
}
