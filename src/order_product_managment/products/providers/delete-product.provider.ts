import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { GetProductParamsDto } from '../dtos/getProductParams.dto';
import { Product } from '../product.entity';

@Injectable()
export class DeleteProductProvider {
  constructor(
    /**inject user service */
    private readonly usersService: UsersService,
    /**inject products repository */
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    /**inject logger service*/
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}

  public async deleteProduct(
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

    //1 find the product from database based on the product id
    try {
      product = await this.productsRepository.findOne({
        where: { id: getProductParamsDto.id, user: { id: user.id } },
        relations: {
          orderProducts: true,
        },
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
      throw new BadRequestException('Product not found');
    }

    if (product.orderProducts.length > 0) {
      this.logger.warn(
        `Cannot delete this product ${getProductParamsDto.id} because it has associated orders.`,
      );
      throw new BadRequestException(
        'Cannot delete this product because it has associated orders.',
      );
    }
    //2 delete the product
    try {
      await this.productsRepository.delete(product.id);
      return { message: 'product deleted', deleted: true, id: product.id };
    } catch (error) {
      this.logger.error(
        'Failed to delete product: Database connection error',
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
  }
}
