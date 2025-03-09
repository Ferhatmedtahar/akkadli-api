import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { GetIp } from 'src/auth/decorators/get-ip.decorator.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { PatchUserDto } from './dtos/patchUser.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    /*
    inject users service */
    private readonly usersService: UsersService,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'get the current user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success fetch for users based on id extracted from the token',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user not found based on the token',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  public getUserMe(@ActiveUser() user: ActiveUserData, @GetIp() ip: string) {
    this.logger.logRequest('get user me', UsersController.name, ip, {
      userId: user.sub,
    });
    return this.usersService.findUserById(user.sub);
  }

  @Patch('/me')
  @ApiOperation({ summary: 'update the current user profile' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success fetch for users based on id extracted from the token',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user not found, please sign up',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'Unable to process the request at the moment, please try later',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  @UseInterceptors(ClassSerializerInterceptor)
  public patchUsers(
    @Body() patchUserDto: PatchUserDto,
    @ActiveUser() user: ActiveUserData,
    @GetIp() ip: string,
  ) {
    this.logger.logRequest('update user me', UsersController.name, ip, {
      userId: user.sub,
    });
    return this.usersService.udpateUser(patchUserDto, user);
  }

  @Delete('/me')
  @ApiOperation({ summary: 'delete the current user' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: HttpStatus.METHOD_NOT_ALLOWED,
    description: 'can not delete a user',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  public deleteUsers(@ActiveUser() user: ActiveUserData, @GetIp() ip: string) {
    this.logger.logRequest('delete user me', UsersController.name, ip, {
      userId: user.sub,
    });
    return this.usersService.delete(user);
  }
  // @Get('/:id')
  // @ApiOperation({ summary: 'get user by id' })
  // @ApiProperty({ description: 'id of the user', example: 1 })
  // public getUserById(@ActiveUser() user: ActiveUserData) {
  //   return this.usersService.findUserById(user.sub);
  // }

  // @Post()
  // @Auth(authType.None)
  // @ApiOperation({ summary: 'create user' })
  // @ApiBody({ type: CreateUserDto })
  // @ApiResponse({ status: 201, description: 'user created' })
  // public createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createUser(createUserDto);
  // }
}
