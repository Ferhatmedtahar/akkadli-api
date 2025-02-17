import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersService } from './providers/users.service';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
    console.log(createUserDto);
    return 'user created';
  }
}
