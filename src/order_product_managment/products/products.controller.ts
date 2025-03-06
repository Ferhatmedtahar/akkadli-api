import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateProductDto } from './dtos/createProduct.dto';
import { GetProductParamsDto } from './dtos/getProductParams.dto';
import { GetProductsDto } from './dtos/getProducts.dto';
import { PatchProductDto } from './dtos/patchProduct.dto';
import { ProductsService } from './providers/products.service';

@Controller('products')
export class ProductsController {
  constructor(
    /**inject products service */
    private readonly productsService: ProductsService,
  ) {}
  // @Auth(authType.None)
  @Get()
  public getProducts(
    @Query() productsQuery: GetProductsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    console.log(user);
    return this.productsService.findAll(productsQuery);
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
