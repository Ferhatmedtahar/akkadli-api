import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

import { authType } from './enums/auth-type.enum';
import { AuthService } from './providers/auth.service';

@Controller('auth')
@ApiTags(`Auth`)
export class AuthController {
  constructor(
    /**inject auth service */
    private readonly authService: AuthService,
  ) {}
  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @Auth(authType.None)
  public async refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.refreshToken(refreshToken);
  }
}
