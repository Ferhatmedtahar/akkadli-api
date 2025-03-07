import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
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

  @Get('/me')
  @ApiOperation({ summary: 'get user by id' })
  @ApiProperty({ description: 'id of the user', example: 1 })
  public getUserMe(@ActiveUser() user: ActiveUserData) {
    console.log(user);
    return this.usersService.findUserById(user.sub);
  }

  @Patch('/me')
  public patchUsers(
    @Body() patchUserDto: PatchUserDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.usersService.udpateUser(patchUserDto, user);
  }

  @Delete('/me')
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
