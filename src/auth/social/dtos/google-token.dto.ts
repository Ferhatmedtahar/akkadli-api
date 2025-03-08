import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GoogleTokenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: 'token',
    description: 'token of the user',
    example: '123456789',
    required: true,
    type: 'string',
  })
  token: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    title: 'accessToken',
    description: 'accessToken of the user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIzLCJpYXQiOjE3NDEzOTA0MTIsImV4cCI6MTc0MTQ3NjgxMiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIn0.BU5IBMkyoJTRzhEam6RaJSqaLKOenpZEN4ePfuNfqUU',
    required: false,
    type: 'string',
  })
  accessToken?: string;
}
