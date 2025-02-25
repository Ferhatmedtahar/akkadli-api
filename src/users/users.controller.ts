import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/createUser.dto';
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
  @Get('/:id')
  @ApiOperation({ summary: 'get user by id' })
  @ApiProperty({ description: 'id of the user', example: 1 })
  public getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }
  @Post()
  @ApiOperation({ summary: 'create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'user created' })
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch('/:id')
  public patchUsers(
    @Body() patchUserDto: PatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.udpateUser(patchUserDto, id);
  }

  @Delete('/:id')
  public deleteUsers(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
