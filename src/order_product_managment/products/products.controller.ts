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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary: 'create product',
  })
  public create(
    @Body() createProductDto: CreateProductDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.productsService.createProduct(createProductDto, user.sub);
  }
  // @Auth(authType.None)
  @Get()
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiResponse({
    status: 400,
    description: 'user not found',
  })
  @ApiResponse({
    status: 200,
    description: 'list of products',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary: 'Get all products of a user',
  })
  public getProducts(
    @Query() productsQuery: GetProductsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.productsService.findAll(productsQuery, user.sub);
  }

  @Get('/:id')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 200,
    description: 'Product fetchedsuccessfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User or Product not found',
  })
  @ApiOperation({
    summary: 'Get product by id and user id',
  })
  public getProductById(
    @Param() getProductParamsDto: GetProductParamsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.productsService.getProductById(getProductParamsDto, user.sub);
  }
  @Patch('/:id')
  @ApiOperation({
    summary: 'Update product by id and user id',
  })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 200,
    description: 'Product udpated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid request',
  })
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
  @ApiOperation({
    summary: 'Delete product by id and user id',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Cannot delete this product because it has associated orders',
  })
  public deleteProduct(
    @Param() getProductParamsDto: GetProductParamsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.productsService.deleteProduct(getProductParamsDto, user.sub);
  }
}
