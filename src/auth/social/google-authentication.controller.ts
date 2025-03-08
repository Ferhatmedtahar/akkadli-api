import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 200,
    description: 'Success ,user created and tokens generated ',
  })
  @ApiOperation({ summary: 'google authentication' })
  public async googleAuthentication(@Body() googleTokenDto: GoogleTokenDto) {
    return this.googleAuthenticationService.authenticate(googleTokenDto);
  }
}
