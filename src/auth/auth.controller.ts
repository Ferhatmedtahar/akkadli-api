import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

import { authType } from './enums/auth-type.enum';
import { AuthService } from './providers/auth.service';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { GetIp } from './decorators/get-ip.decorator.decorator';

@Controller('auth')
@ApiTags(`Auth`)
export class AuthController {
  constructor(
    /**inject auth service */
    private readonly authService: AuthService,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}
  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @Auth(authType.None)
  @ApiOperation({
    summary: 'get new refresh token and access token',
  })
  @ApiResponse({
    status: 200,
    description: 'get new refresh token and access token',
  })
  @ApiResponse({
    status: 401,
    description: 'user not found or invalid refresh token',
  })
  public async refreshToken(
    @Body() refreshToken: RefreshTokenDto,
    @GetIp() ip: string,
  ) {
    this.logger.logRequest(
      `refreshToken: ${JSON.stringify(refreshToken)}`,
      AuthController.name,
      ip,
    );
    return this.authService.refreshToken(refreshToken);
  }
}
