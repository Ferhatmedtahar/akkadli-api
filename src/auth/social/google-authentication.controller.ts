import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { authType } from '../enums/auth-type.enum';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { GoogleAuthenticationService } from './provider/google-authentication.provider';

@Controller('auth/google-authentication')
@ApiTags('Google Authentication')
export class GoogleAuthenticationController {
  constructor(
    /**inject google authentication service */
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}
  @Post()
  @Auth(authType.None)
  public async googleAuthentication(@Body() googleTokenDto: GoogleTokenDto) {
    console.log('start', googleTokenDto);
    return this.googleAuthenticationService.authenticate(googleTokenDto);
  }
}
