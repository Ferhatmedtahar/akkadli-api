import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './providers/products.service';

@Controller('products')
export class ProductsController {
  constructor(
    /**inject products service */
    private readonly productsService: ProductsService,
  ) {}
  @Get()
  public getProducts() {
    return [];
  }
}
