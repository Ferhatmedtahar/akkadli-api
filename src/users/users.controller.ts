import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { GetUserParamsDto } from './dtos/getUserParams.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { PatchUserDto } from './dtos/patchUser.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    /*
    inject users service */
    private readonly usersService: UsersService,
  ) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/me')
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
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,

    example:
      ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  public getUserMe(@ActiveUser() user: ActiveUserData) {
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
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,

    example:
      ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  public patchUsers(
    @Body() patchUserDto: PatchUserDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.usersService.udpateUser(patchUserDto, user);
  }

  @Delete('/me')
  @ApiOperation({ summary: 'delete the current user' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,

    example:
      ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @ApiResponse({
    status: HttpStatus.METHOD_NOT_ALLOWED,
    description: 'can not delete a user',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  public deleteUsers(@ActiveUser() user: ActiveUserData) {
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
