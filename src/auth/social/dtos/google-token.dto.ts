import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GoogleTokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;
  @IsString()
  @IsOptional()
  accessToken?: string;
}
