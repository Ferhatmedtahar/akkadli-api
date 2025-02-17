import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public findUserById(id: number) {
    return {
      id,
      firstName: 'ferhat',
      lastName: 'tahar',
      email: 'ferhattahar@gmail.com',
    };
  }
}
