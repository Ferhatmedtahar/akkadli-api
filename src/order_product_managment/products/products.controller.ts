import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './providers/products.service';
import { GetProductParamsDto } from './dtos/getProductParams.dto';
import { CreateProductDto } from './dtos/createProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(
    /**inject products service */
    private readonly productsService: ProductsService,
  ) {}
  @Get()
  public getProducts() {
    return this.productsService.findAll();
  }

  @Get(':id')
  public getProductById(@Param() getProductParamsDto: GetProductParamsDto) {
    return this.productsService.getProductById(getProductParamsDto);
  }

  @Post()
  public createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }
}
