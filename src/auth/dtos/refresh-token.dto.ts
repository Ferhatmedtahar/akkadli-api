import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @ApiProperty({
    title: 'refresh token',
    description: 'refresh token of the user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIzLCJpYXQiOjE3NDEzOTA0MTIsImV4cCI6MTc0MTQ3NjgxMiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIn0.BU5IBMkyoJTRzhEam6RaJSqaLKOenpZEN4ePfuNfqUU',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  refreshToken: string;
}
