import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    /**inject auth service */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public findUserById(id: number) {
    return {
      id,
      firstName: 'ferhat',
      lastName: 'tahar',
      email: 'ferhattahar@gmail.com',
    };
  }
}
