import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateDeliveryDto } from './dtos/createDeliveries.dto';
import { GetDeliveriesDto } from './dtos/getDeliveries.dto';
import { GetDeliveryParamsDto } from './dtos/getDeliveryParams.dto';
import { PatchDeliveryDto } from './dtos/patchDeliveries.dto';
import { DeliveryService } from './providers/delivery.service';

@Controller('settings/deliveries')
export class DeliveriesController {
  constructor(
    /**inject deliveries service */
    private readonly deliveriesService: DeliveryService,
  ) {}

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,

    example:
      ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, and could not be updated',
  })
  @ApiResponse({
    status: 400,
    description:
      'user not found or delivery already exists or delivery not created',
  })
  @ApiResponse({
    status: 201,
    description: 'Delivery created successfully',
  })
  @ApiOperation({ summary: 'Create Delivery' })
  public createDelivery(
    @Body() createDeliveryDto: CreateDeliveryDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.deliveriesService.createDelivery(createDeliveryDto, user.sub);
  }

  @Get()
  // @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,

    example:
      ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
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
    description: 'list of deliveries',
  })
  @ApiOperation({
    summary: 'get all deliveries by user id',
  })
  public findAllByUserId(
    @Query() deliveriesQuery: GetDeliveriesDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.deliveriesService.findAllByUserId(deliveriesQuery, user.sub);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'get delivery by id',
  })
  @ApiParam({
    name: 'id',
    description: 'id of the delivery',
    example: '1',
    type: 'number',
    required: false,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,

    example:
      ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiResponse({
    status: 400,
    description: 'user or delivery not found',
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
  })
  @ApiResponse({
    status: 200,
    description: 'delivery',
  })
  public findOneById(
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.deliveriesService.findOneById(getDeliveryParamsDto, user.sub);
  }

  @Patch('/:id')
  @ApiParam({
    name: 'id',
    description: 'id of the delivery',
    example: '1',
    type: 'number',
    required: false,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,

    example:
      ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, and could not be updated',
  })
  @ApiResponse({
    status: 400,
    description: 'user or delivery not found',
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
  })
  @ApiResponse({
    status: 200,
    description: 'delivery',
  })
  @ApiOperation({
    summary: 'udpate delivery by id',
  })
  public updateDelivery(
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
    @Body() patchDeliveryDto: PatchDeliveryDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.deliveriesService.updateDelivery(
      getDeliveryParamsDto,
      patchDeliveryDto,
      user.sub,
    );
  }
  @Delete('/:id')
  @ApiOperation({
    summary: 'delete delivery by id',
  })
  @ApiParam({
    name: 'id',
    description: 'id of the delivery',
    example: '1',
    type: 'number',
    required: false,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,

    example:
      ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @ApiResponse({
    status: 500,
    description:
      'Unable to process the request at the moment, and could not be updated',
  })
  @ApiResponse({
    status: 400,
    description: 'user or delivery not found',
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'message',
  })
  public deleteDelivery(
    @Param() getDeliveryParamsDto: GetDeliveryParamsDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.deliveriesService.deleteDelivery(
      getDeliveryParamsDto,
      user.sub,
    );
  }
}
