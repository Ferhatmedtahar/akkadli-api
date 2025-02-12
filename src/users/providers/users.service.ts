import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public findUserById(id: number) {
    return `hi user ${id}`;
  }
}
