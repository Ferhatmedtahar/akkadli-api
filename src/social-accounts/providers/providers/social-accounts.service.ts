import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class SocialAccountsService {
  constructor(
    /**
    inject user service */
    private readonly usersService: UsersService,
  ) {}

  public findAll(userId: number) {
    const user = this.usersService.findUserById(userId);
    console.log(user);
    if (!user) {
      return [];
    }
    return [
      {
        id: 1,
        platform: 'facebook',
        accountName: 'ferhat',
        accessToken: 'ferhat',
      },
    ];
  }
}
