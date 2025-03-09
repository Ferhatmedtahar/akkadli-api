import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { User } from 'src/users/user.entity';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
// import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokenProvider {
  constructor(
    /**inject jwt service */
    private readonly jwtService: JwtService,
    /**inject  config service*/
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}
  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn,
        audience: this.jwtConfiguration.tokenAudience,
        issuer: this.jwtConfiguration.tokenIssuer,
      },
    );
  }

  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      await this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTTL,
        { email: user.email },
      ),
      //generate the refresh token
      await this.signToken(user.id, this.jwtConfiguration.refreshTokenTTL),
    ]);
    this.logger.log('generate tokens for user', GenerateTokenProvider.name, {
      user: user.id,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
