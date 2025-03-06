import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  // @IsJWT()
  @IsNotEmpty()
  refreshToken: string;
}
