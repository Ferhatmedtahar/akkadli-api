import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/providers/users.service';
import jwtConfig from '../config/jwt.config';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class RefreshTokenProvider {
  constructor(
    /**inject user service */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    /**inject generate token service */
    private readonly generateTokenProvider: GenerateTokenProvider,
    /**inject jwt service */
    private readonly jwtService: JwtService,
    /**inject  config service*/
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  public async refreshToken(refreshTokendto: RefreshTokenDto) {
    //verify the refresh token is valid using jwt service
    let user = undefined;
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokendto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.tokenAudience,
        issuer: this.jwtConfiguration.tokenIssuer,
      });

      // if (!payload) throw new  UnauthorizedException('Invalid refresh token');
      //based on the id , we will fetch the user
      user = await this.userService.findUserById(sub);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    //create the tokens
    return await this.generateTokenProvider.generateTokens(user);
  }
}
