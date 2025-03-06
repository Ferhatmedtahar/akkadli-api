import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';
import { authType } from 'src/auth/enums/auth-type.enum';
import { AccessTokenGuard } from '../access.token/access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  //default strategy
  private static readonly defaultAuthType: authType = authType.Bearer;

  //map of auth type to guard

  private readonly authTypeGuardMap: Record<
    authType,
    CanActivate | CanActivate[]
  > = {
    [authType.Bearer]: this.accessTokenGuard,
    [authType.None]: { canActivate: () => true },
  };

  //constructor

  constructor(
    private readonly reflector: Reflector,
    /**inject access token guard */
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //authTypes from the reflector
    const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    //array of guards

    const guards = authTypes
      .map((type: authType) => {
        return this.authTypeGuardMap[type];
      })
      .flat();
    let error = new UnauthorizedException('Unauthorized');

    //loop guards canActivate fire
    for (const guard of guards) {
      const canActivate = await Promise.resolve(
        guard.canActivate(context),
      ).catch((err) => {
        error = err;
      });
      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
