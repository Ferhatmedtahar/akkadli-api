import { Injectable } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokenProvider } from './refresh-token.provider';

@Injectable()
export class AuthService {
  constructor(
    /**inject refresh token provider */
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}
  public async refreshToken(refreshTokendto: RefreshTokenDto) {
    return this.refreshTokenProvider.refreshToken(refreshTokendto);
  }
}
