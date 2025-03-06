import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**inject jwt service */
    private readonly jwtService: JwtService,
    /**inject jwt config */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //extract the request from excution context
    //extract the token from the header
    //validate the token ,ADD THE USER TO THE REQUEST
    const request: Request = this.extractRequestFromExecutionContext(context);
    const token = this.extracttokenFromRequest(request);
    if (!token) throw new UnauthorizedException('Access token not found');
    let payload = undefined;
    try {
      payload = await this.validateToken(token);
      request[REQUEST_USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException('Invalid token, please login again');
    }
    return true;
  }

  private extractRequestFromExecutionContext(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  private extracttokenFromRequest(request: Request): string | undefined {
    //Bearer token
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
  private async validateToken(token: string) {
    //verify the token by passing the token and the entire config
    return await this.jwtService.verifyAsync(token, this.jwtConfiguration);
  }
}
