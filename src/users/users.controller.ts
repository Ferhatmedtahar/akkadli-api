import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(
    /*
    inject users service */
    private readonly usersService: UsersService,
  ) {}
  @Get('/:id')
  public test(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }
}
