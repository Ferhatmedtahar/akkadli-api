import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/createProduct.dto';
import { GetProductParamsDto } from './dtos/getProductParams.dto';
import { PatchProductDto } from './dtos/patchProduct.dto';
import { ProductsService } from './providers/products.service';

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
  public create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }
  @Patch('/:id')
  public updateProduct(
    @Body() updateProductDto: PatchProductDto,
    @Param() getProductParamsDto: GetProductParamsDto,
  ) {
    return this.productsService.updateProduct(
      getProductParamsDto,
      updateProductDto,
    );
  }

  @Delete('/:id')
  public deleteProduct(@Param() getProductParamsDto: GetProductParamsDto) {
    return this.productsService.deleteProduct(getProductParamsDto);
  }
}
