import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GenerateTokenProvider } from 'src/auth/providers/generate-token.provider';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { ILogger } from 'src/logger/interfaces/logger.interface';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(
    /**inject jwt config service */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /**inject user service */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    /**generate token provider */
    private readonly generateTokenProvider: GenerateTokenProvider,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}
  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      let user = undefined;
      //verify the google token sent by the user
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      //extract the payload from the Google JWT
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
        picture: publicProfileUrl,
      } = loginTicket.getPayload();

      //check if user exists in our database using googeId
      try {
        user = await this.userService.findUserByGoogleId(googleId);
      } catch (e) {
        this.logger.error(
          'Database error while finding user',
          e.stack || e.message || 'No stack trace available',
        );
        throw new InternalServerErrorException(
          'Unable to process the request',
          {
            description: 'error connecting to the database',
            cause: e,
          },
        );
      }
      //if google id exists generate tokens

      if (user) {
        return this.generateTokenProvider.generateTokens(user);
      }
      //if not create a new user then generate tokens

      const newUser = await this.userService.createUser({
        googleId,
        firstName,
        lastName,
        email,
        publicProfileUrl,
      } as CreateUserDto);
      if (newUser) {
        return this.generateTokenProvider.generateTokens(newUser);
      }
    } catch (error) {
      this.logger.error(
        'Database error while  creating new user',
        error.stack || error.message || 'No stack trace available',
      );
      //if error send unauthorized
      throw new UnauthorizedException('User not found, please signup', {
        description: 'error connecting to db',
        cause: error,
      });
    }
  }
}
