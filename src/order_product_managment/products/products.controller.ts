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
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateProductDto } from './dtos/createProduct.dto';
import { GetProductParamsDto } from './dtos/getProductParams.dto';
import { GetProductsDto } from './dtos/getProducts.dto';
import { PatchProductDto } from './dtos/patchProduct.dto';
import { ProductsService } from './providers/products.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    /**inject products service */
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  public create(
    @Body() createProductDto: CreateProductDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.productsService.createProduct(createProductDto, user.sub);
  }
  // @Auth(authType.None)
  @Get()
  public getProducts(
    @Query() productsQuery: GetProductsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    console.log(user);
    return this.productsService.findAll(productsQuery, user.sub);
  }

  @Get(':id')
  public getProductById(
    @Param() getProductParamsDto: GetProductParamsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.productsService.getProductById(getProductParamsDto, user.sub);
  }
  @Patch('/:id')
  public updateProduct(
    @Body() updateProductDto: PatchProductDto,
    @Param() getProductParamsDto: GetProductParamsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.productsService.updateProduct(
      getProductParamsDto,
      updateProductDto,
      user.sub,
    );
  }

  @Delete('/:id')
  public deleteProduct(
    @Param() getProductParamsDto: GetProductParamsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.productsService.deleteProduct(getProductParamsDto, user.sub);
  }
}
